from .proposals import TEMPLATE as PROPOSALS

_TEMPLATES = {PROPOSALS["code"]: PROPOSALS}


def get_flow_template(code: str) -> dict:
    if code not in _TEMPLATES:
        raise ValueError(f"Fluxo desconhecido: {code}")
    return _TEMPLATES[code]
