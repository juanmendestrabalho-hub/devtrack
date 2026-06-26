from pydantic import BaseModel

class TaskCreate(BaseModel):
    title: str
    type: str
    duration: int

class TaskResponse(TaskCreate):
    id: int

    class Config:
        from_attributes = True
