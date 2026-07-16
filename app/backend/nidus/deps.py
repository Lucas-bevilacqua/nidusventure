"""Dependencias de request: identidade e escopo por organizacao.

O escopo por org/workspace e a linha de defesa do isolamento multiempresa no MVP
(SQLite). Em producao acrescenta-se RLS no Postgres (spec secao 10/11).
"""
from fastapi import Depends, Header, HTTPException
from sqlalchemy.orm import Session

from .db import get_db
from .models import Membership, User, Workspace


def current_user(
    authorization: str = Header(default=""),
    db: Session = Depends(get_db),
) -> User:
    token = authorization.removeprefix("Bearer ").strip()
    if not token:
        raise HTTPException(401, "Token ausente. Use 'Authorization: Bearer <token>'.")
    user = db.query(User).filter(User.api_token == token).first()
    if not user:
        raise HTTPException(401, "Token invalido.")
    return user


def current_org_id(user: User = Depends(current_user), db: Session = Depends(get_db)) -> str:
    m = db.query(Membership).filter(Membership.user_id == user.id).first()
    if not m:
        raise HTTPException(403, "Usuario sem organizacao.")
    return m.org_id


def assert_workspace_in_org(db: Session, workspace_id: str, org_id: str) -> Workspace:
    ws = db.query(Workspace).filter(Workspace.id == workspace_id).first()
    if not ws or ws.org_id != org_id:
        # Nao revela existencia de dados de outra org.
        raise HTTPException(404, "Workspace nao encontrado.")
    return ws
