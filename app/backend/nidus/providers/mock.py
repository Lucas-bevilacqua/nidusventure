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
            return self._proposals(prompt, ctx)
        # fallback generico
        out = {"content": "(mock) fluxo nao especializado", "uncertainties": [],
               "human_decisions": [], "checklist": []}
        return self._wrap(prompt, out)

    @staticmethod
    def _estimate_tokens(text: str) -> int:
        # Proxy grosseiro (~4 chars/token). Substituido por contagem real ao
        # ligar um provedor com API. Serve para demonstrar o pipeline de custo.
        return max(1, len(text) // 4)

    def _wrap(self, prompt: Prompt, out: dict) -> Completion:
        text = json.dumps(out, ensure_ascii=False)
        tokens_in = self._estimate_tokens(prompt.system + prompt.as_user_message())
        tokens_out = self._estimate_tokens(text)
        return Completion(text=text, tokens_in=tokens_in, tokens_out=tokens_out,
                          provider=self.name, model="mock")

    def _proposals(self, prompt: Prompt, ctx: dict) -> Completion:
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
        return self._wrap(prompt, out)
