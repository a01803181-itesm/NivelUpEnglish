from psycopg import AsyncConnection
from app.schemas.students import Student
import logging

logger = logging.getLogger(__name__)

async def select_student(conn: AsyncConnection, studentID: str) -> Student | None:
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

async def select_students(conn: AsyncConnection) -> list[Student]:
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

async def insert_student(conn: AsyncConnection, student: Student) -> Student | None:
    query = """
        INSERT INTO students
        (student_id, course_id, name, email, phone_number)
        VALUES (%s, %s, %s, %s, %s)
        RETURNING student_id, course_id, name, email, phone_number;
    """

    try:
        async with conn.cursor() as cur:
            await cur.execute(
                    query,
                    (
                        student.student_id,
                        student.course_id,
                        student.name,
                        student.email,
                        student.phone_number,
                    )
                )

            row = await cur.fetchone()
            
            if row:
                return Student(
                    student_id=row[0],
                    course_id=row[1],
                    name=row[2],
                    email=row[3],
                    phone_number=row[4]
                )

            return None
    except Exception as e:
        logger.error(f"Error during creation of student with ID {student.student_id}: {e}")
        return None

async def update_student_profile(conn: AsyncConnection, student_id: str, updates: dict) -> Student | None:
    if not updates:
        return None

    set_clauses = [f"{key} = %s" for key in updates.keys()]

    values = list(updates.values())

    query = f"""
        UPDATE students
        SET {', '.join(set_clauses)}
        WHERE student_id = %s
        RETURNING student_id, course_id, name, email, phone_number;
    """

    values.append(student_id)

    try:
        async with conn.cursor() as cur:
            await cur.execute(query, tuple(values))

            row = await cur.fetchone()

            if row:
                return Student(
                    student_id=row[0],
                    course_id=row[1],
                    name=row[2],
                    email=row[3],
                    phone_number=row[4]
                )

            return None
    except Exception as e:
        logger.error(f"Failed updating student with ID: {student_id}. {e}")
        return None

async def delete_student(conn: AsyncConnection, student_id: str) -> bool:
    query = """
        DELETE FROM students
        WHERE student_id = %s
        RETURNING student_id;
    """

    try:
        async with conn.cursor() as cur:
            await cur.execute(query, (student_id,))

            row = await cur.fetchone()

            return row is not None
    except Exception as e:
        logger.error(f"Error deleting student with ID {student_id}: {e}")
        return False

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