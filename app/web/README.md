# Nidus OS — Web (painel do cliente)

React + Vite + TypeScript. Painel autoguiado: signup → Ninho → fluxo → ativação →
executar tarefa → revisão humana. Conversa com o backend (`app/backend`) na porta 8010.

## Rodar local

Suba o backend primeiro (`app/backend`, porta 8010). Depois:

```bash
cd app/web
npm install
cp .env.example .env      # VITE_API_BASE=http://127.0.0.1:8010
npm run dev               # http://127.0.0.1:5173
```

Fluxo de demonstração no painel:
1. Crie a conta (cria empresa + workspace).
2. Passo 1 — Ninho: cadastre a tabela de preços e o tom de voz.
3. Passo 2/3 — crie o fluxo de Propostas e ative (define você como revisor).
4. Passo 4 — preencha um pedido (itens, prazo, desconto) e "Preparar entrega".
5. Passo 5 — revise o rascunho (incertezas, decisões humanas, checklist) e aprove/rejeite.

Itens sem preço no Ninho saem como `[PRECO A CONFIRMAR]` — nada é inventado.

> Auth por token no localStorage é placeholder do MVP. Em produção: auth gerenciada
> e a chave de IA permanece só no servidor (ver `docs/NIDUS_OS_SPEC.md`).
