"""Testes essenciais do motor de fluxos (spec secao 21.8).

Provam as regras duras do fluxo de Propostas usando o provedor mock (sem chaves).
"""
import json
import os

# Forca SQLite em memoria nos testes, ignorando qualquer DATABASE_URL global do ambiente.
os.environ["DATABASE_URL"] = "sqlite:///:memory:"

from nidus.db import Base, SessionLocal, engine  # noqa: E402
from nidus.engine import run_flow  # noqa: E402
from nidus.models import FlowInstance, NinhoItem, Task, Workspace  # noqa: E402


def _fresh_db():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    return SessionLocal()


def _setup(db, precos):
    ws = Workspace(org_id="org1", name="Empresa Teste")
    db.add(ws)
    db.flush()
    db.add(NinhoItem(workspace_id=ws.id, type="precos", title="Tabela",
                     body=json.dumps(precos), status="current"))
    inst = FlowInstance(workspace_id=ws.id, flow_template_id="proposals", template_version=1)
    db.add(inst)
    db.commit()
    return inst


def test_usa_preco_da_tabela():
    db = _fresh_db()
    inst = _setup(db, [{"nome": "Plano Pro", "preco": "199,00"}])
    task = Task(flow_instance_id=inst.id, created_by="u1",
                payload={"cliente": "ACME", "itens": [{"nome": "Plano Pro", "quantidade": 3}]})
    db.add(task); db.commit()

    out = run_flow(db, task)
    assert "199,00" in out.content
    assert "[PRECO A CONFIRMAR]" not in out.content
    assert out.provider_used == "mock"
    assert task.status == "ready"


def test_nao_inventa_preco_ausente():
    db = _fresh_db()
    inst = _setup(db, [{"nome": "Plano Pro", "preco": "199,00"}])
    task = Task(flow_instance_id=inst.id, created_by="u1",
                payload={"cliente": "ACME", "itens": [{"nome": "Servico X", "quantidade": 1}]})
    db.add(task); db.commit()

    out = run_flow(db, task)
    assert "[PRECO A CONFIRMAR]" in out.content
    assert any("Servico X" in u for u in out.uncertainties)


def test_desconto_vira_decisao_humana():
    db = _fresh_db()
    inst = _setup(db, [{"nome": "Plano Pro", "preco": "199,00"}])
    task = Task(flow_instance_id=inst.id, created_by="u1",
                payload={"cliente": "ACME", "desconto": True,
                         "itens": [{"nome": "Plano Pro", "quantidade": 1}]})
    db.add(task); db.commit()

    out = run_flow(db, task)
    assert any("desconto" in d.lower() for d in out.human_decisions)


def test_campo_obrigatorio_ausente_vira_incerteza():
    db = _fresh_db()
    inst = _setup(db, [])
    task = Task(flow_instance_id=inst.id, created_by="u1",
                payload={"itens": [{"nome": "Plano Pro", "quantidade": 1}]})  # sem 'cliente'
    db.add(task); db.commit()

    out = run_flow(db, task)
    assert any("cliente" in u.lower() for u in out.uncertainties)
