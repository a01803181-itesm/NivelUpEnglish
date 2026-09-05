from psycopg import AsyncConnection
from typing import Dict, Any
import logging

logger = logging.getLogger(__name__)

async def get_student_course(conn: AsyncConnection, firebase_uid: str) -> Dict[str, Any] | None:
    query = """
        SELECT c.level, c.schedule_time_start, c.schedule_time_end
        FROM students s JOIN courses s ON s.course_id = c.course_id
        WHERE s.student_id = %s
    """

    try:
        async with conn.cursor() as cur:
            await cur.execute(query, (firebase_uid,))
            row = await cur.fetchone()

            if row:
                return {
                    "level": row[0],
                    "schedule_time_start": str(row[1]),
                    "schedule_time_end": str(row[2])
                }
            return None
    except Exception as e:
        logger.error(f"Error fetching course for student {firebase_uid}: {e}")
        return None