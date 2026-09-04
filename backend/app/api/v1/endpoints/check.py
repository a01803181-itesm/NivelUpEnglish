from fastapi import APIRouter
from app.core.database import DBSession

router = APIRouter()

@router.get('/')
async def check(db: DBSession):
    return { "message": "herkese Merhaba!!" }