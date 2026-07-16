from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_db
from ..deps import assert_workspace_in_org, current_org_id, current_user
from ..engine import run_flow
from ..models import FlowInstance, Review, Task
from ..schemas import ReviewIn, TaskIn

router = APIRouter(prefix="/tasks", tags=["tasks"])


def _task_scoped(db: Session, task_id: str, org_id: str) -> Task:
    task = db.query(Task).filter(Task.id == task_id).first()
    if not task:
        raise HTTPException(404, "Tarefa nao encontrada.")
    inst = db.query(FlowInstance).filter(FlowInstance.id == task.flow_instance_id).first()
    assert_workspace_in_org(db, inst.workspace_id, org_id)
    return task


def _serialize(task: Task) -> dict:
    out = task.output
    return {
        "id": task.id,
        "status": task.status,
        "payload": task.payload,
        "output": None if not out else {
            "content": out.content,
            "uncertainties": out.uncertainties,
            "human_decisions": out.human_decisions,
            "checklist": out.checklist,
            "provider_used": out.provider_used,
            "flow_version": out.flow_version,
        },
    }


@router.post("")
def create_task(data: TaskIn, user=Depends(current_user), org_id: str = Depends(current_org_id), db: Session = Depends(get_db)):
    inst = db.query(FlowInstance).filter(FlowInstance.id == data.flow_instance_id).first()
    if not inst:
        raise HTTPException(404, "Fluxo nao encontrado.")
    assert_workspace_in_org(db, inst.workspace_id, org_id)

    task = Task(flow_instance_id=inst.id, created_by=user.id, payload=data.payload, status="queued")
    db.add(task)
    db.commit()
    db.refresh(task)

    # No MVP roda sincrono; migrar para worker/fila depois (spec secao 10).
    run_flow(db, task)
    db.refresh(task)
    return _serialize(task)


@router.get("/{task_id}")
def get_task(task_id: str, org_id: str = Depends(current_org_id), db: Session = Depends(get_db)):
    return _serialize(_task_scoped(db, task_id, org_id))


@router.post("/{task_id}/review")
def review_task(task_id: str, data: ReviewIn, user=Depends(current_user), org_id: str = Depends(current_org_id), db: Session = Depends(get_db)):
    task = _task_scoped(db, task_id, org_id)
    if data.action == "reject" and not data.reason:
        raise HTTPException(400, "Informe o motivo ao rejeitar.")

    review = Review(
        task_id=task.id, reviewer_id=user.id, action=data.action,
        comment=data.comment, edited_content=data.edited_content,
        reason=data.reason, saved_as_example=data.saved_as_example,
    )
    if data.action == "approve":
        task.status = "approved"
    elif data.action == "reject":
        task.status = "rejected"
    elif data.action == "regenerate":
        db.add(review)
        db.commit()
        run_flow(db, task)  # nova versao
        db.refresh(task)
        return _serialize(task)
    db.add(review)
    db.commit()
    db.refresh(task)
    return _serialize(task)
