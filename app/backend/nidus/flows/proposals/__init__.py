"""Fluxo de Propostas (primeiro fluxo do MVP — ver spec secao 8.1 e 18)."""
from pathlib import Path

_PROMPT_V1 = (Path(__file__).parent / "prompt_v1.txt").read_text(encoding="utf-8")

TEMPLATE = {
    "code": "proposals",
    "name": "Propostas",
    "version": 1,
    "prompt": _PROMPT_V1,
    # Campos de entrada obrigatorios (validados pelo motor; faltas viram incertezas).
    "required_fields": ["cliente", "itens"],
    # Tipos de NinhoItem que este fluxo consulta.
    "used_references": ["precos", "modelo", "tom", "restricao", "exemplo"],
    "output_format": "proposta_rascunho",
    # JSON Schema da saida (usado por output_config.format nos provedores reais).
    "output_schema": {
        "type": "object",
        "properties": {
            "content": {"type": "string"},
            "uncertainties": {"type": "array", "items": {"type": "string"}},
            "human_decisions": {"type": "array", "items": {"type": "string"}},
            "checklist": {"type": "array", "items": {"type": "string"}},
        },
        "required": ["content", "uncertainties", "human_decisions", "checklist"],
        "additionalProperties": False,
    },
}
