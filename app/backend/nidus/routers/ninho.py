from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..db import get_db
from ..deps import assert_workspace_in_org, current_org_id
from ..models import NinhoItem
from ..schemas import NinhoItemIn

router = APIRouter(prefix="/ninho", tags=["ninho"])


@router.post("/items")
def create_item(data: NinhoItemIn, org_id: str = Depends(current_org_id), db: Session = Depends(get_db)):
    assert_workspace_in_org(db, data.workspace_id, org_id)
    item = NinhoItem(workspace_id=data.workspace_id, type=data.type, title=data.title, body=data.body)
    db.add(item)
    db.commit()
    db.refresh(item)
    return {"id": item.id, "type": item.type, "title": item.title, "status": item.status}


@router.get("/items")
def list_items(workspace_id: str, org_id: str = Depends(current_org_id), db: Session = Depends(get_db)):
    assert_workspace_in_org(db, workspace_id, org_id)
    items = db.query(NinhoItem).filter(NinhoItem.workspace_id == workspace_id).all()
    return [{"id": i.id, "type": i.type, "title": i.title, "status": i.status} for i in items]
