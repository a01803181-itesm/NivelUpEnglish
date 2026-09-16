from psycopg import AsyncConnection
from app.schemas.students import Student
import logging

logger = logging.getLogger(__name__)

async def get_student(conn: AsyncConnection, studentID: int) -> Student | None:
    query = """
        SELECT
        student_id, course_id, name, email, phone_number
        FROM students
        WHERE student_id = %s;
    """

    try:
        async with conn.cursor() as cur:
            await cur.execute(query, (studentID,))

            row = await cur.fetchone()

            if row:
                return Student(
                    student_id=row[0],
                    course_id=row[1],
                    name=row[2],
                    email=row[3],
                    phone_number=row[4],
                )

            return None
    except Exception as e:
        logger.error(f"Error reading student with ID {studentID}: {e}")
        return None

async def get_students(conn: AsyncConnection) -> list[Student]:
    query = """
        SELECT
        student_id, course_id, name, email, phone_number
        FROM students;
    """

    try:
        async with conn.cursor() as cur:
            await cur.execute(query)

            rows = await cur.fetchall()

            if len(rows) > 0:
                return [
                    Student(
                        student_id=row[0],
                        course_id=row[1],
                        name=row[2],
                        email=row[3],
                        phone_number=row[4]
                    )
                    for row in rows
                ]

            return None
    except Exception as e:
        logger.error(f"Error reading all students: {e}")
        return []

async def upsert_student(conn: AsyncConnection, firebase_uid: str, full_name: str, email: str) -> bool:
    query = """
        INSERT INTO students (student_id, name, email)
        VALUES (%s, %s, %s)
        ON CONFLICT (student_id) DO NOTHING;
    """

    try:
        async with conn.cursor() as cur:
            await cur.execute(query, (firebase_uid, full_name, email))
        return True
    except Exception as e:
        logger.error(f"Error upserting student {firebase_uid}: {e}")
        return False