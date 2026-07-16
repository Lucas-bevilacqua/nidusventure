"""Selecao do provedor. A Nidus define qual usar (config/ambiente); o cliente nao."""
from ..config import settings
from .base import AIProvider
from .mock import MockProvider


def get_provider(code: str | None = None) -> AIProvider:
    code = (code or settings.ai_default_provider or "mock").lower()
    if code == "mock":
        return MockProvider()
    if code == "anthropic":
        from .anthropic import AnthropicProvider
        return AnthropicProvider()
    if code == "openai":
        from .openai import OpenAIProvider
        return OpenAIProvider()
    if code == "openrouter":
        from .openrouter import OpenRouterProvider
        return OpenRouterProvider()
    raise ValueError(f"Provedor de IA desconhecido: {code}")
