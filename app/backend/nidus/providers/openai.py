"""Provedor OpenAI. SDK importado de forma preguicosa (ver anthropic.py)."""
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
        text = resp.choices[0].message.content or ""
        tokens = resp.usage.total_tokens if resp.usage else 0
        return Completion(text=text, tokens=tokens, provider=self.name)
