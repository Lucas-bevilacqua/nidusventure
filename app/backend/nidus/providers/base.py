"""Abstracao de provedor de inteligencia (spec, Camada 4).

O cliente final NAO escolhe o modelo. A Nidus define o provedor por ambiente/fluxo.
Chaves de API vivem apenas no servidor. Trocar de provedor nao muda a experiencia
do cliente: todos recebem o mesmo `Prompt` e devolvem um `Completion`.
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass, field


@dataclass
class Prompt:
    system: str
    context: dict = field(default_factory=dict)  # {references, input, flow_code}
    schema: dict | None = None  # JSON Schema para saida estruturada (opcional)

    def as_user_message(self) -> str:
        """Serializa o contexto para provedores baseados em mensagens."""
        import json
        return (
            "REFERENCIAS (Ninho):\n"
            + json.dumps(self.context.get("references", {}), ensure_ascii=False, indent=2)
            + "\n\nENTRADA DA TAREFA:\n"
            + json.dumps(self.context.get("input", {}), ensure_ascii=False, indent=2)
            + "\n\nGere a saida no formato JSON exigido pelo SYSTEM."
        )


@dataclass
class Completion:
    text: str          # JSON (string) conforme contrato do fluxo
    tokens_in: int = 0
    tokens_out: int = 0
    provider: str = ""
    model: str = ""
    cost_usd: float | None = None  # custo real informado pelo provedor (ex.: OpenRouter)

    @property
    def tokens(self) -> int:
        return self.tokens_in + self.tokens_out


class AIProvider(ABC):
    name: str = "base"

    @abstractmethod
    def complete(self, prompt: Prompt, timeout: int = 120) -> Completion:
        ...
