"""Precificacao de uso de IA (custo por execucao) — base da metodologia de precos
da spec (secao 13). Preco em USD por 1 milhao de tokens (entrada, saida).

A conversao para BRL e o markup dos planos sao decisao de negocio (cambio + margem).
Este modulo calcula apenas o CUSTO DE INFRAESTRUTURA por execucao.
"""

# (provedor, modelo) -> (USD por 1M tokens de entrada, USD por 1M tokens de saida)
# Precos Anthropic conforme referencia oficial (jan/2026).
PRICES: dict[tuple[str, str], tuple[float, float]] = {
    ("anthropic", "claude-opus-4-8"): (5.0, 25.0),
    ("anthropic", "claude-sonnet-5"): (3.0, 15.0),   # intro $2/$10 ate 2026-08-31
    ("anthropic", "claude-haiku-4-5"): (1.0, 5.0),
    # OpenAI: valores aproximados — CONFIRMAR na tabela oficial antes de usar em producao.
    ("openai", "gpt-4o"): (2.5, 10.0),
    ("mock", "mock"): (0.0, 0.0),
}


def cost_usd(provider: str, model: str, tokens_in: int, tokens_out: int) -> float:
    price = PRICES.get((provider, model))
    if price is None:
        return 0.0  # modelo sem preco cadastrado -> custo desconhecido
    p_in, p_out = price
    return (tokens_in * p_in + tokens_out * p_out) / 1_000_000
