from dataclasses import dataclass

@dataclass
class Student:
    student_id: str
    course_id: str | None
    name: str | None
    email: str
    phone_number: str