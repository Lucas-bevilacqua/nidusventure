"""Hash de senha (argon2). Auth de token e um placeholder do MVP:
em producao, trocar por auth gerenciada (Clerk/Auth0/Supabase) — DECISAO PENDENTE.
"""
from passlib.context import CryptContext

_pwd = CryptContext(schemes=["argon2"], deprecated="auto")


def hash_password(raw: str) -> str:
    return _pwd.hash(raw)


def verify_password(raw: str, hashed: str) -> bool:
    return _pwd.verify(raw, hashed)
