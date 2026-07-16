"""Provedor mock: deterministico, roda sem chaves de API.

Serve para dev e testes. Emula o comportamento OBRIGATORIO do fluxo de Propostas:
usa somente precos presentes nas referencias; se um preco nao existir, escreve
[PRECO A CONFIRMAR] e registra uma incerteza. Nunca inventa valores.
"""
import json

from .base import AIProvider, Completion, Prompt


class MockProvider(AIProvider):
    name = "mock"

    def complete(self, prompt: Prompt, timeout: int = 120) -> Completion:
        ctx = prompt.context
        flow = ctx.get("flow_code")
        if flow == "proposals":
            return self._proposals(ctx)
        # fallback generico
        out = {"content": "(mock) fluxo nao especializado", "uncertainties": [],
               "human_decisions": [], "checklist": []}
        return Completion(text=json.dumps(out, ensure_ascii=False), provider=self.name)

    def _proposals(self, ctx: dict) -> Completion:
        data = ctx.get("input", {})
        refs = ctx.get("references", {})
        precos = {str(p.get("nome", "")).lower(): p for p in refs.get("precos", [])}

        linhas, incertezas, decisoes = [], [], []
        for item in data.get("itens", []):
            nome = str(item.get("nome", "")).strip()
            qtd = item.get("quantidade", 1)
            p = precos.get(nome.lower())
            if p:
                linhas.append(f"- {qtd}x {nome}: R$ {p.get('preco')}")
            else:
                linhas.append(f"- {qtd}x {nome}: [PRECO A CONFIRMAR]")
                incertezas.append(f"Preco de '{nome}' nao encontrado no Ninho.")

        if data.get("desconto"):
            decisoes.append("Cliente pediu desconto — requer decisao humana (nao aprovado).")

        proposta = (
            "PROPOSTA (RASCUNHO — para revisao)\n"
            f"Cliente: {data.get('cliente', '[CLIENTE]')}\n\n"
            "Itens:\n" + "\n".join(linhas) +
            (f"\n\nPrazo desejado: {data['prazo']}" if data.get("prazo") else "")
        )
        checklist = [
            "Precos conferem com a tabela do Ninho?",
            "Escopo esta completo?",
            "Nenhum valor foi inventado?",
            "Tom adequado ao padrao da empresa?",
        ]
        out = {
            "content": proposta,
            "uncertainties": incertezas,
            "human_decisions": decisoes,
            "checklist": checklist,
        }
        return Completion(text=json.dumps(out, ensure_ascii=False), provider=self.name)
