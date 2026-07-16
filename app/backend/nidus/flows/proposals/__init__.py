"""Fluxo de Propostas (primeiro fluxo do MVP — ver spec secao 8.1 e 18)."""
from pathlib import Path

_PROMPT_V1 = (Path(__file__).parent / "prompt_v1.txt").read_text(encoding="utf-8")

TEMPLATE = {
    "code": "proposals",
    "name": "Propostas",
    "version": 1,
    "prompt": _PROMPT_V1,
    # Campos de entrada obrigatorios (validados pelo motor; faltas viram incertezas).
    "required_fields": ["cliente", "itens"],
    # Tipos de NinhoItem que este fluxo consulta.
    "used_references": ["precos", "modelo", "tom", "restricao", "exemplo"],
    "output_format": "proposta_rascunho",
}
