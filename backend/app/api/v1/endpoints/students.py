from fastapi import APIRouter, HTTPException
from typing import Any
from app.schemas.students import Student
from app.core.database import DBSession
from app.crud.students import get_student, get_students

router = APIRouter()

@router.get("/{student_id}", response_model=Student)
async def read_student(
    db: DBSession,
    student_id: str
) -> Any:
    student = await get_student(db, student_id)

    if not student:
        raise HTTPException(
            status_code=404,
            detail=f"Student with ID {student_id} not found."
        )

    return student

@router.get("", response_model=list[Student])
async def read_all_students(db: DBSession) -> Any:
    students = await get_students(db)

    return students