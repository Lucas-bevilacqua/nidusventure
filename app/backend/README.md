# Nidus OS — Backend (MVP scaffold)

FastAPI + SQLAlchemy. Implementa o núcleo do produto: **motor de fluxos**,
**abstração de provedores de IA** (roda com `mock`, sem chaves) e o **fluxo de Propostas**.

> Estado: scaffold da fundação (backlog itens 1–9 da spec). Auth por token e execução
> síncrona são placeholders do MVP — ver `docs/NIDUS_OS_SPEC.md` para o alvo de produção.

## Rodar local

Porta **8010** (evita conflito com o projeto Cobrança/Da Vinci, que usa a 8000).

```bash
cd app/backend
python -m venv .venv && source .venv/Scripts/activate   # Windows Git Bash
pip install -r requirements.txt
cp .env.example .env
python -m uvicorn nidus.main:app --reload --port 8010
# Docs interativas: http://127.0.0.1:8010/docs
```

## Testes

```bash
cd app/backend
python -m pytest -q
```

Os testes provam as regras duras do fluxo de Propostas (spec 21.8):
nunca inventa preço, preço ausente vira `[PRECO A CONFIRMAR]` + incerteza,
desconto vira decisão humana, campo obrigatório ausente vira incerteza.

## Demo end-to-end (com o provedor mock)

```bash
cd app/backend
python demo.py
```

## Provedores de IA

`AI_DEFAULT_PROVIDER` no `.env`: `mock` (padrão, sem chave) · `anthropic` · `openai`.
As chaves ficam **só no servidor**. Trocar de provedor não muda a experiência do cliente.

## Estrutura

```
nidus/
  main.py            app FastAPI + rotas
  config.py db.py    settings + engine/session
  models.py          modelo de dados (subconjunto da spec)
  security.py deps.py hash de senha + escopo por org (isolamento)
  engine.py          motor de fluxos (valida->refs->prompt->IA->valida->salva)
  providers/         base + mock + anthropic + openai + registry
  flows/proposals/   template + prompt versionado (prompt_v1.txt)
  routers/           auth, ninho, flow-instances, tasks
tests/               testes essenciais do motor
demo.py              execução completa do fluxo de Propostas
```
