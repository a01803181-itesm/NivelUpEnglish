from fastapi import APIRouter, HTTPException, status
from typing import Any
from app.schemas.students import Student, StudentProfileUpdate
from app.core.database import DBSession
from app.crud.students import select_student, select_students, insert_student, update_student_profile, delete_student

router = APIRouter()

@router.get("/{student_id}", response_model=Student)
async def read_student(
    db: DBSession,
    student_id: str
) -> Any:
    student = await select_student(db, student_id)

    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found."
        )

    return student

@router.get("", response_model=list[Student])
async def read_all_students(db: DBSession) -> Any:
    students = await select_students(db)
    
    return students

@router.post("", response_model=Student, status_code=status.HTTP_201_CREATED)
async def create_student(
    db: DBSession,
    student: Student
) -> Any:
    new_student = await insert_student(db, student)

    if not new_student:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Student could not be created. Verify the data or if the student already is registered."
        )

    await db.commit()

    return new_student

@router.patch("/{student_id}", response_model=Student)
async def patch_student_profile(
    db: DBSession,
    student_id: str,
    updates: StudentProfileUpdate
) -> Any:
    update_data = updates.model_dump(exclude_unset=True)

    if not update_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No valid fields provided for update."
        )
    
    updated_student = await update_student_profile(db, student_id, update_data)

    if not updated_student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found."
        )

    await db.commit()

    return updated_student

@router.delete("/{student_id}", status_code=status.HTTP_204_NO_CONTENT)
async def drop_student(
    db: DBSession,
    student_id: str
) -> None:
    deleted = await delete_student(db, student_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Student with ID {student_id} not found."
        )

    await db.commit()

    return None