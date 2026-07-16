"""Medicao de tokens e custo por execucao — base da metodologia de precos (spec 13).

Roda N execucoes de exemplo do fluxo de Propostas pelo provedor configurado
(AI_DEFAULT_PROVIDER) e reporta tokens medios e custo por execucao. Projeta o
custo mensal para um volume dado.

    python measure.py            # 20 execucoes
    python measure.py 100        # 100 execucoes

Com AI_DEFAULT_PROVIDER=mock (padrao) os tokens sao ESTIMADOS (~4 chars/token) —
suficiente para validar o pipeline. Para numeros REAIS, configure uma chave e
AI_DEFAULT_PROVIDER=anthropic (ou openai) no .env e rode de novo.
"""
import json
import os
import sys

os.environ["DATABASE_URL"] = "sqlite:///:memory:"

from nidus.config import settings
from nidus.db import Base, SessionLocal, engine
from nidus.engine import run_flow
from nidus.models import FlowInstance, NinhoItem, Task, Workspace

# Volume assumido para a projecao mensal (ajuste conforme o plano).
EXECUCOES_MES = 1000

CASOS = [
    {"cliente": "ACME Ltda", "prazo": "12 meses",
     "itens": [{"nome": "Plano Pro", "quantidade": 3}]},
    {"cliente": "Beta S.A.", "prazo": "6 meses", "desconto": True,
     "itens": [{"nome": "Plano Starter", "quantidade": 10},
               {"nome": "Onboarding", "quantidade": 1}]},
    {"cliente": "Gamma ME",
     "itens": [{"nome": "Plano Pro", "quantidade": 1},
               {"nome": "Suporte Premium", "quantidade": 1}]},
]


def main():
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 20
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    ws = Workspace(org_id="org", name="Medicao")
    db.add(ws); db.flush()
    precos = [{"nome": "Plano Pro", "preco": "199,00"},
              {"nome": "Plano Starter", "preco": "99,00"}]
    db.add(NinhoItem(workspace_id=ws.id, type="precos", title="Tabela",
                     body=json.dumps(precos), status="current"))
    db.add(NinhoItem(workspace_id=ws.id, type="tom", title="Tom",
                     body="Cordial e direto.", status="current"))
    inst = FlowInstance(workspace_id=ws.id, flow_template_id="proposals", template_version=1)
    db.add(inst); db.commit()

    tot_in = tot_out = 0
    tot_cost = 0.0
    provider = model = ""
    for i in range(n):
        caso = CASOS[i % len(CASOS)]
        task = Task(flow_instance_id=inst.id, created_by="measure", payload=caso)
        db.add(task); db.commit()
        out = run_flow(db, task)
        tot_in += out.tokens_in
        tot_out += out.tokens_out
        tot_cost += out.cost_usd
        provider = out.provider_used
        model = {"mock": "(mock)", "openrouter": settings.openrouter_model,
                 "openai": settings.openai_model}.get(provider, settings.anthropic_model)

    print("\n" + "=" * 60)
    print(f"MEDICAO — {n} execucoes | provedor: {provider} | modelo: {model}")
    print("=" * 60)
    print(f"Tokens entrada (media): {tot_in / n:,.0f}")
    print(f"Tokens saida   (media): {tot_out / n:,.0f}")
    print(f"Custo por execucao:     US$ {tot_cost / n:.6f}")
    print(f"Custo de {n} execucoes:  US$ {tot_cost:.4f}")
    print("-" * 60)
    proj = (tot_cost / n) * EXECUCOES_MES
    print(f"Projecao ({EXECUCOES_MES}/mes): US$ {proj:.2f}/mes de custo de API")
    print("=" * 60)
    if provider == "mock":
        print("Tokens ESTIMADOS (provedor mock). Configure uma chave real no .env")
        print("e AI_DEFAULT_PROVIDER=anthropic para medir tokens reais.")
    print("Regra de preco (spec 13): preco_plano >= custo_api + storage + suporte + margem.")


if __name__ == "__main__":
    main()
