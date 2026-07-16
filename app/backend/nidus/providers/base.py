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
    tokens: int = 0
    provider: str = ""


class AIProvider(ABC):
    name: str = "base"

    @abstractmethod
    def complete(self, prompt: Prompt, timeout: int = 120) -> Completion:
        ...
