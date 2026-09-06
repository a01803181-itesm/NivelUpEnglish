from fastapi import APIRouter
from app.api.v1.endpoints import check, dashboard

api_router = APIRouter()

api_router.include_router(check.router, prefix="/check", tags=["Check"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])