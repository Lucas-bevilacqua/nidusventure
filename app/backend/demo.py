"""Demo end-to-end do fluxo de Propostas com o provedor mock (sem chaves).

Roda: cria empresa/workspace -> popula o Ninho com uma tabela de precos ->
cria a instancia do fluxo -> executa uma tarefa -> imprime a entrega para revisao.

    python demo.py
"""
import json
import os

# Forca SQLite local na demo, ignorando qualquer DATABASE_URL global do ambiente.
os.environ["DATABASE_URL"] = "sqlite:///./nidus_demo.db"

from nidus.db import Base, SessionLocal, engine
from nidus.engine import run_flow
from nidus.models import FlowInstance, NinhoItem, Organization, Task, Workspace


def main():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    org = Organization(name="Empresa Demo")
    db.add(org); db.flush()
    ws = Workspace(org_id=org.id, name="Empresa Demo")
    db.add(ws); db.flush()

    precos = [
        {"nome": "Plano Pro", "preco": "199,00"},
        {"nome": "Plano Starter", "preco": "99,00"},
    ]
    db.add(NinhoItem(workspace_id=ws.id, type="precos", title="Tabela de precos",
                     body=json.dumps(precos), status="current"))
    db.add(NinhoItem(workspace_id=ws.id, type="tom", title="Tom de voz",
                     body="Cordial, direto e profissional.", status="current"))

    inst = FlowInstance(workspace_id=ws.id, flow_template_id="proposals", template_version=1)
    db.add(inst); db.commit()

    task = Task(
        flow_instance_id=inst.id, created_by="demo",
        payload={
            "cliente": "ACME Ltda",
            "itens": [
                {"nome": "Plano Pro", "quantidade": 3},
                {"nome": "Onboarding Premium", "quantidade": 1},  # sem preco no Ninho
            ],
            "prazo": "12 meses",
            "desconto": True,
        },
    )
    db.add(task); db.commit()

    out = run_flow(db, task)

    print("\n" + "=" * 60)
    print("ENTREGA (RASCUNHO) — status:", task.status, "| provedor:", out.provider_used)
    print("=" * 60)
    print(out.content)
    print("\n-- INCERTEZAS --")
    for u in out.uncertainties:
        print("  •", u)
    print("\n-- DECISOES HUMANAS --")
    for d in out.human_decisions:
        print("  •", d)
    print("\n-- CHECKLIST DE REVISAO --")
    for c in out.checklist:
        print("  [ ]", c)
    print("=" * 60)
    print("Observe: 'Onboarding Premium' saiu como [PRECO A CONFIRMAR] — nada foi inventado.")


if __name__ == "__main__":
    main()
