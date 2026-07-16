from pydantic import BaseModel, EmailStr, Field


class SignupIn(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8)
    company_name: str


class AuthOut(BaseModel):
    token: str
    user_id: str
    org_id: str
    workspace_id: str


class LoginIn(BaseModel):
    email: EmailStr
    password: str


class NinhoItemIn(BaseModel):
    workspace_id: str
    type: str
    title: str
    body: str


class FlowInstanceIn(BaseModel):
    workspace_id: str
    flow_template_id: str = "proposals"


class ReviewerIn(BaseModel):
    reviewer_id: str


class TaskIn(BaseModel):
    flow_instance_id: str
    payload: dict


class ReviewIn(BaseModel):
    action: str  # approve/edit/regenerate/reject
    comment: str | None = None
    edited_content: str | None = None
    reason: str | None = None
    saved_as_example: bool = False
