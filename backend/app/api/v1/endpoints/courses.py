from fastapi import APIRouter, Form

router = APIRouter()

@router.post('/')
async def create_new_course(
    id: int = Form(...),
    module_name: str = Form(...),
    level: str = Form(...),
):
    ...