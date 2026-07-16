from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .db import init_db
from .routers import auth, flows, ninho, tasks


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()  # cria tabelas no dev (SQLite). Em prod, usar migrations.
    yield


app = FastAPI(title="Nidus OS API", version="0.1.0", lifespan=lifespan)

# CORS liberado para dev. Em prod, restringir a origem do painel.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(ninho.router)
app.include_router(flows.router)
app.include_router(tasks.router)


@app.get("/health", tags=["health"])
def health():
    return {"status": "ok", "service": "nidus-os-api"}
