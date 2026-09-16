from pydantic import BaseModel, EmailStr

class Student(BaseModel):
    student_id: str
    course_id: int | None = None
    name: str
    email: EmailStr
    phone_number: str | None = None

class StudentUpdate(BaseModel):
    student_id: str | None = None
    course_id: int | None = None
    name: str | None = None
    email: EmailStr | None = None
    phone_number: str | None = None