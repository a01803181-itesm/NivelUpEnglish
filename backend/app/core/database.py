from typing import AsyncGenerator, Annotated
from fastapi import Depends
from psycopg import AsyncConnection
from app.core.db_handler import Connection, PostgreManager
from app.core.config import settings

connection = Connection(
    database=settings.DB_NAME,
    host=settings.DB_HOST,
    password=settings.DB_PASSWORD,
    user=settings.DB_USER,
    port=settings.DB_PORT
)

db_manager = PostgreManager(connection)

async def get_db() -> AsyncGenerator[AsyncConnection, None]:
    async with db_manager.get_connection() as conn:
        yield conn

DBSession = Annotated[AsyncConnection, Depends(get_db)]