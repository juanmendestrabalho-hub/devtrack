from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models, database, schemas, crud

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI()

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"status": "DevTrack running"}

@app.post("/tasks")
def create(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)

@app.get("/tasks")
def read(db: Session = Depends(get_db)):
    return crud.get_tasks(db)
