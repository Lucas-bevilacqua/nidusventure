from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..db import get_db
from ..deps import assert_workspace_in_org, current_org_id
from ..flows import get_flow_template
from ..models import FlowInstance
from ..schemas import FlowInstanceIn, ReviewerIn

router = APIRouter(prefix="/flow-instances", tags=["flows"])


@router.get("/catalog")
def catalog():
    from ..flows.registry import _TEMPLATES
    return [{"code": t["code"], "name": t["name"], "version": t["version"]} for t in _TEMPLATES.values()]


@router.post("")
def create_instance(data: FlowInstanceIn, org_id: str = Depends(current_org_id), db: Session = Depends(get_db)):
    assert_workspace_in_org(db, data.workspace_id, org_id)
    template = get_flow_template(data.flow_template_id)
    inst = FlowInstance(
        workspace_id=data.workspace_id,
        flow_template_id=template["code"],
        template_version=template["version"],
        status="config",
    )
    db.add(inst)
    db.commit()
    db.refresh(inst)
    return {"id": inst.id, "flow": inst.flow_template_id, "status": inst.status}


def _get_instance_scoped(db: Session, instance_id: str, org_id: str) -> FlowInstance:
    inst = db.query(FlowInstance).filter(FlowInstance.id == instance_id).first()
    if not inst:
        raise HTTPException(404, "Fluxo nao encontrado.")
    assert_workspace_in_org(db, inst.workspace_id, org_id)
    return inst


@router.post("/{instance_id}/reviewer")
def set_reviewer(instance_id: str, data: ReviewerIn, org_id: str = Depends(current_org_id), db: Session = Depends(get_db)):
    inst = _get_instance_scoped(db, instance_id, org_id)
    inst.reviewer_id = data.reviewer_id
    db.commit()
    return {"id": inst.id, "reviewer_id": inst.reviewer_id}


@router.post("/{instance_id}/activate")
def activate(instance_id: str, org_id: str = Depends(current_org_id), db: Session = Depends(get_db)):
    inst = _get_instance_scoped(db, instance_id, org_id)
    # REGRA: todo fluxo exige revisor antes de ativar (spec secao 13/21.8).
    if not inst.reviewer_id:
        raise HTTPException(400, "Defina um revisor antes de ativar o fluxo.")
    inst.status = "active"
    db.commit()
    return {"id": inst.id, "status": inst.status}
