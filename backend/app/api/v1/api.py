from fastapi import APIRouter
from app.api.v1.endpoints import check

api_router = APIRouter()

api_router.include_router(check.router, prefix="/check", tags=["Check"])