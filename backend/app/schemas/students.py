from pydantic import BaseModel, EmailStr

class Student(BaseModel):
    student_id: str
    course_id: int | None = None
    name: str
    email: EmailStr
    phone_number: str | None = None