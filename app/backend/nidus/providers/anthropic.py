"""Provedor Anthropic. SDK importado de forma preguicosa: o app roda sem ele
instalado enquanto o provedor padrao for 'mock'. Chave lida do ambiente (server-side).
"""
from ..config import settings
from .base import AIProvider, Completion, Prompt


class AnthropicProvider(AIProvider):
    name = "anthropic"

    def complete(self, prompt: Prompt, timeout: int = 120) -> Completion:
        import anthropic  # import tardio

        client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
        resp = client.messages.create(
            model=settings.anthropic_model,
            max_tokens=2000,
            system=prompt.system,
            messages=[{"role": "user", "content": prompt.as_user_message()}],
            timeout=timeout,
        )
        text = "".join(block.text for block in resp.content if getattr(block, "type", "") == "text")
        tokens = resp.usage.input_tokens + resp.usage.output_tokens
        return Completion(text=text, tokens=tokens, provider=self.name)
