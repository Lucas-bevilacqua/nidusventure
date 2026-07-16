"""Motor de fluxos (spec, Camada 3).

No MVP roda de forma sincrona; a assinatura de run_flow foi desenhada para migrar
para um worker/fila sem mudar o contrato (ver spec secao 10). Faz:
validar entrada -> selecionar referencias -> montar instrucoes -> acionar provedor
(com retry) -> validar saida -> salvar TaskOutput + checklist.
"""
import json
import time

from sqlalchemy.orm import Session

from .flows import get_flow_template
from .models import FlowInstance, NinhoItem, Task, TaskOutput
from .providers import Prompt, get_provider
from .providers.pricing import cost_usd


def _select_references(db: Session, workspace_id: str, wanted_types: list[str]) -> dict:
    items = (
        db.query(NinhoItem)
        .filter(NinhoItem.workspace_id == workspace_id, NinhoItem.status == "current")
        .all()
    )
    refs: dict = {}
    used_ids: list[str] = []
    for item in items:
        if item.type not in wanted_types:
            continue
        used_ids.append(item.id)
        if item.type == "precos":
            try:
                refs["precos"] = json.loads(item.body)
            except json.JSONDecodeError:
                refs["precos"] = []
        else:
            refs.setdefault(item.type, []).append(item.body)
    return {"refs": refs, "used_ids": used_ids}


def _validate_input(payload: dict, required: list[str]) -> list[str]:
    """Faltas NAO bloqueiam a execucao: viram incertezas (spec)."""
    missing = [f for f in required if not payload.get(f)]
    return [f"Campo obrigatorio ausente: {f}" for f in missing]


def _parse_json(text: str) -> dict:
    """Parse tolerante: remove cercas markdown e isola o objeto JSON."""
    t = text.strip()
    if t.startswith("```"):
        t = t.split("```", 2)[1] if t.count("```") >= 2 else t.strip("`")
        if t.lstrip().startswith("json"):
            t = t.lstrip()[4:]
    try:
        return json.loads(t)
    except json.JSONDecodeError:
        start, end = t.find("{"), t.rfind("}")
        if start != -1 and end != -1:
            return json.loads(t[start:end + 1])
        raise


def _with_retries(fn, attempts: int = 3, base_delay: float = 0.5):
    last = None
    for i in range(attempts):
        try:
            return fn()
        except Exception as exc:  # noqa: BLE001
            last = exc
            if i < attempts - 1:
                time.sleep(base_delay * (2**i))
    raise last


def run_flow(db: Session, task: Task) -> TaskOutput:
    instance: FlowInstance = task.flow_instance
    template = get_flow_template(instance.flow_template_id)

    task.status = "processing"
    db.commit()

    # 1. validar entrada
    input_warnings = _validate_input(task.payload, template["required_fields"])

    # 2. selecionar referencias do Ninho
    selected = _select_references(db, instance.workspace_id, template["used_references"])

    # 3. montar instrucoes
    prompt = Prompt(
        system=template["prompt"],
        context={
            "flow_code": template["code"],
            "references": selected["refs"],
            "input": task.payload,
        },
        schema=template.get("output_schema"),
    )

    # 4. acionar provedor (server-side, com retry)
    provider_code = instance.config.get("provider")
    provider = get_provider(provider_code)
    try:
        completion = _with_retries(lambda: provider.complete(prompt, timeout=120))
        parsed = _parse_json(completion.text)
    except Exception:  # noqa: BLE001
        task.status = "failed"
        db.commit()
        raise

    # 5. validar saida (junta avisos de entrada com incertezas do modelo)
    uncertainties = list(dict.fromkeys(input_warnings + parsed.get("uncertainties", [])))

    # 6/7. salvar entrega + checklist + custo (real do provedor, ou estimado pela tabela)
    cost = completion.cost_usd
    if cost is None:
        cost = cost_usd(completion.provider, completion.model,
                        completion.tokens_in, completion.tokens_out)
    output = TaskOutput(
        task_id=task.id,
        content=parsed.get("content", ""),
        uncertainties=uncertainties,
        human_decisions=parsed.get("human_decisions", []),
        checklist=parsed.get("checklist", []),
        references_used=selected["used_ids"],
        flow_version=template["version"],
        provider_used=completion.provider,
        tokens_used=completion.tokens,
        tokens_in=completion.tokens_in,
        tokens_out=completion.tokens_out,
        cost_usd=cost,
    )
    db.add(output)
    task.status = "ready"
    db.commit()
    db.refresh(output)
    return output
