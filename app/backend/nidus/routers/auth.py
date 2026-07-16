from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_db
from ..models import Membership, Organization, User, Workspace
from ..schemas import AuthOut, LoginIn, SignupIn
from ..security import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/signup", response_model=AuthOut)
def signup(data: SignupIn, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(409, "Este e-mail ja tem conta.")

    user = User(name=data.name, email=data.email, password_hash=hash_password(data.password))
    org = Organization(name=data.company_name)
    db.add_all([user, org])
    db.flush()

    membership = Membership(org_id=org.id, user_id=user.id, role="owner")
    workspace = Workspace(org_id=org.id, name=data.company_name)
    db.add_all([membership, workspace])
    db.commit()

    return AuthOut(token=user.api_token, user_id=user.id, org_id=org.id, workspace_id=workspace.id)


@router.post("/login", response_model=AuthOut)
def login(data: LoginIn, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(401, "E-mail ou senha invalidos.")
    m = db.query(Membership).filter(Membership.user_id == user.id).first()
    ws = db.query(Workspace).filter(Workspace.org_id == m.org_id).first()
    return AuthOut(token=user.api_token, user_id=user.id, org_id=m.org_id, workspace_id=ws.id)
