from fastapi import APIRouter
from app.core.database import DBSession

router = APIRouter()

@router.get("/")
async def get_student():
    # TODO
    ...