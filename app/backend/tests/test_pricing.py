"""Testes da precificacao e da contagem de tokens no motor."""
import json
import os

os.environ["DATABASE_URL"] = "sqlite:///:memory:"
os.environ["AI_DEFAULT_PROVIDER"] = "mock"

from nidus.db import Base, SessionLocal, engine  # noqa: E402
from nidus.engine import run_flow  # noqa: E402
from nidus.models import FlowInstance, NinhoItem, Task, Workspace  # noqa: E402
from nidus.providers.pricing import cost_usd  # noqa: E402


def test_cost_opus():
    # 1M entrada + 1M saida no Opus 4.8 = 5 + 25 = 30 USD
    assert cost_usd("anthropic", "claude-opus-4-8", 1_000_000, 1_000_000) == 30.0


def test_cost_sonnet_cheaper_than_opus():
    a = cost_usd("anthropic", "claude-sonnet-5", 1000, 1000)
    o = cost_usd("anthropic", "claude-opus-4-8", 1000, 1000)
    assert 0 < a < o


def test_cost_unknown_model_zero():
    assert cost_usd("anthropic", "modelo-inexistente", 1000, 1000) == 0.0


def test_engine_registra_tokens_e_custo():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    ws = Workspace(org_id="org1", name="Empresa")
    db.add(ws); db.flush()
    db.add(NinhoItem(workspace_id=ws.id, type="precos", title="Tabela",
                     body=json.dumps([{"nome": "Plano Pro", "preco": "199,00"}]),
                     status="current"))
    inst = FlowInstance(workspace_id=ws.id, flow_template_id="proposals", template_version=1)
    db.add(inst); db.commit()
    task = Task(flow_instance_id=inst.id, created_by="u1",
                payload={"cliente": "ACME", "itens": [{"nome": "Plano Pro", "quantidade": 3}]})
    db.add(task); db.commit()

    out = run_flow(db, task)
    # Mock estima tokens > 0; custo do mock e 0 (sem preco de API).
    assert out.tokens_in > 0 and out.tokens_out > 0
    assert out.tokens_used == out.tokens_in + out.tokens_out
    assert out.cost_usd == 0.0  # provedor mock nao tem custo de API
