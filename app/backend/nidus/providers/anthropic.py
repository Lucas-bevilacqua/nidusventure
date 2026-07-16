"""Provedor Anthropic. SDK importado de forma preguicosa: o app roda sem ele
instalado enquanto o provedor padrao for 'mock'. Chave lida do ambiente (server-side).

Usa saida estruturada (output_config.format) para garantir JSON valido, e reporta
tokens de entrada/saida para a medicao de custo (ver nidus/providers/pricing.py).

Nota de custo: neste fluxo de extracao estruturada o pensamento (thinking) fica
DESLIGADO por padrao no Opus 4.8 (omitir o parametro) para reduzir custo e manter
a saida deterministica. Para tarefas mais dificeis, habilite pensamento adaptativo:
thinking={"type": "adaptive"}, output_config={"effort": "high", "format": {...}}.
"""
from ..config import settings
from .base import AIProvider, Completion, Prompt


class AnthropicProvider(AIProvider):
    name = "anthropic"

    def complete(self, prompt: Prompt, timeout: int = 120) -> Completion:
        import anthropic  # import tardio

        client = anthropic.Anthropic(api_key=settings.anthropic_api_key, timeout=timeout)
        kwargs: dict = {
            "model": settings.anthropic_model,
            "max_tokens": 4000,
            "system": prompt.system,
            "messages": [{"role": "user", "content": prompt.as_user_message()}],
        }
        if prompt.schema:
            kwargs["output_config"] = {"format": {"type": "json_schema", "schema": prompt.schema}}

        resp = client.messages.create(**kwargs)
        text = "".join(b.text for b in resp.content if getattr(b, "type", "") == "text")
        return Completion(
            text=text,
            tokens_in=resp.usage.input_tokens,
            tokens_out=resp.usage.output_tokens,
            provider=self.name,
            model=settings.anthropic_model,
        )
