"""Provedor OpenRouter (API compativel com OpenAI, multi-modelo).

Chamada via HTTP (httpx) para capturar o campo usage.cost que a OpenRouter
retorna — o custo REAL da execucao em USD, sem depender de tabela de precos.
Chave lida do ambiente (server-side); nunca vai ao navegador.

O modelo e definido pela Nidus (OPENROUTER_MODEL). IDs seguem o padrao OpenRouter,
ex.: "openai/gpt-4o-mini", "anthropic/claude-sonnet-4.5", "google/gemini-2.0-flash-001".
"""
import httpx

from ..config import settings
from .base import AIProvider, Completion, Prompt


class OpenRouterProvider(AIProvider):
    name = "openrouter"

    def complete(self, prompt: Prompt, timeout: int = 120) -> Completion:
        body = {
            "model": settings.openrouter_model,
            "messages": [
                {"role": "system", "content": prompt.system},
                {"role": "user", "content": prompt.as_user_message()},
            ],
            "max_tokens": 4000,
            # Pede JSON; se o modelo nao suportar, a instrucao do system ainda vale.
            "response_format": {"type": "json_object"},
            "usage": {"include": True},  # garante usage.cost na resposta
        }
        headers = {
            "Authorization": f"Bearer {settings.openrouter_api_key}",
            "Content-Type": "application/json",
            "X-Title": "Nidus OS",
        }
        resp = httpx.post(
            f"{settings.openrouter_base_url}/chat/completions",
            json=body, headers=headers, timeout=timeout,
        )
        resp.raise_for_status()
        data = resp.json()

        text = data["choices"][0]["message"]["content"] or ""
        usage = data.get("usage", {})
        return Completion(
            text=text,
            tokens_in=usage.get("prompt_tokens", 0),
            tokens_out=usage.get("completion_tokens", 0),
            provider=self.name,
            model=settings.openrouter_model,
            cost_usd=usage.get("cost"),  # custo real em USD, quando disponivel
        )
