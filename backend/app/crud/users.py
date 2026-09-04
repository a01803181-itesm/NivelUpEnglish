from psycopg import AsyncConnection
import logging

logger = logging.getLogger(__name__)

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