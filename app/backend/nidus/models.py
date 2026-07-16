"""Modelo de dados do MVP (subconjunto da spec, secao 9).

Isolamento multiempresa: toda entidade de dados de cliente carrega organization_id
(direto ou via workspace). No MVP em SQLite o escopo e aplicado na camada de app
(ver deps.py); em producao acrescenta-se RLS no Postgres (ver spec secao 10/11).
"""
from datetime import datetime, timezone
from uuid import uuid4

from sqlalchemy import JSON, DateTime, ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .db import Base


def _uuid() -> str:
    return uuid4().hex


def _now() -> datetime:
    return datetime.now(timezone.utc)


class Organization(Base):
    __tablename__ = "organizations"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    name: Mapped[str] = mapped_column(String(120))
    segment: Mapped[str | None] = mapped_column(String(120), nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="active")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)


class User(Base):
    __tablename__ = "users"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    name: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(200), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    api_token: Mapped[str] = mapped_column(String(64), index=True, default=_uuid)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)


class Membership(Base):
    __tablename__ = "memberships"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True)
    user_id: Mapped[str] = mapped_column(ForeignKey("users.id"), index=True)
    role: Mapped[str] = mapped_column(String(20), default="owner")  # owner/admin/reviewer/operator/viewer


class Workspace(Base):
    __tablename__ = "workspaces"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    org_id: Mapped[str] = mapped_column(ForeignKey("organizations.id"), index=True)
    name: Mapped[str] = mapped_column(String(120))
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)


class NinhoItem(Base):
    __tablename__ = "ninho_items"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    workspace_id: Mapped[str] = mapped_column(ForeignKey("workspaces.id"), index=True)
    # type: precos | modelo | regra | tom | restricao | exemplo | documento | criterios
    type: Mapped[str] = mapped_column(String(30), index=True)
    title: Mapped[str] = mapped_column(String(160))
    body: Mapped[str] = mapped_column(Text)  # texto ou JSON serializado (ex.: tabela de precos)
    status: Mapped[str] = mapped_column(String(20), default="current")
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)


class FlowInstance(Base):
    __tablename__ = "flow_instances"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    workspace_id: Mapped[str] = mapped_column(ForeignKey("workspaces.id"), index=True)
    flow_template_id: Mapped[str] = mapped_column(String(40))  # ex.: "proposals"
    template_version: Mapped[int] = mapped_column(default=1)
    status: Mapped[str] = mapped_column(String(20), default="config")  # config/active/paused
    reviewer_id: Mapped[str | None] = mapped_column(String(32), nullable=True)
    config: Mapped[dict] = mapped_column(JSON, default=dict)  # FlowConfiguration embutida no MVP
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)

    tasks: Mapped[list["Task"]] = relationship(back_populates="flow_instance")


class Task(Base):
    __tablename__ = "tasks"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    flow_instance_id: Mapped[str] = mapped_column(ForeignKey("flow_instances.id"), index=True)
    created_by: Mapped[str] = mapped_column(String(32))
    status: Mapped[str] = mapped_column(String(20), default="queued")  # queued/processing/ready/approved/rejected/failed
    payload: Mapped[dict] = mapped_column(JSON, default=dict)  # TaskInput
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)

    flow_instance: Mapped["FlowInstance"] = relationship(back_populates="tasks")
    output: Mapped["TaskOutput | None"] = relationship(back_populates="task", uselist=False)


class TaskOutput(Base):
    __tablename__ = "task_outputs"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    task_id: Mapped[str] = mapped_column(ForeignKey("tasks.id"), unique=True, index=True)
    content: Mapped[str] = mapped_column(Text)
    uncertainties: Mapped[list] = mapped_column(JSON, default=list)
    human_decisions: Mapped[list] = mapped_column(JSON, default=list)
    checklist: Mapped[list] = mapped_column(JSON, default=list)
    references_used: Mapped[list] = mapped_column(JSON, default=list)
    flow_version: Mapped[int] = mapped_column(default=1)
    provider_used: Mapped[str] = mapped_column(String(30), default="mock")
    tokens_used: Mapped[int] = mapped_column(default=0)
    tokens_in: Mapped[int] = mapped_column(default=0)
    tokens_out: Mapped[int] = mapped_column(default=0)
    cost_usd: Mapped[float] = mapped_column(default=0.0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)

    task: Mapped["Task"] = relationship(back_populates="output")


class Review(Base):
    __tablename__ = "reviews"
    id: Mapped[str] = mapped_column(String(32), primary_key=True, default=_uuid)
    task_id: Mapped[str] = mapped_column(ForeignKey("tasks.id"), index=True)
    reviewer_id: Mapped[str] = mapped_column(String(32))
    action: Mapped[str] = mapped_column(String(20))  # approve/edit/regenerate/reject
    comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    edited_content: Mapped[str | None] = mapped_column(Text, nullable=True)
    reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    saved_as_example: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=_now)
