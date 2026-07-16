"""Provedor OpenAI. SDK importado de forma preguicosa (ver anthropic.py).
Reporta tokens de entrada/saida para a medicao de custo.
"""
from ..config import settings
from .base import AIProvider, Completion, Prompt


class OpenAIProvider(AIProvider):
    name = "openai"

    def complete(self, prompt: Prompt, timeout: int = 120) -> Completion:
        from openai import OpenAI  # import tardio

        client = OpenAI(api_key=settings.openai_api_key, timeout=timeout)
        resp = client.chat.completions.create(
            model=settings.openai_model,
            messages=[
                {"role": "system", "content": prompt.system},
                {"role": "user", "content": prompt.as_user_message()},
            ],
            response_format={"type": "json_object"},
        )
        usage = resp.usage
        return Completion(
            text=resp.choices[0].message.content or "",
            tokens_in=usage.prompt_tokens if usage else 0,
            tokens_out=usage.completion_tokens if usage else 0,
            provider=self.name,
            model=settings.openai_model,
        )
