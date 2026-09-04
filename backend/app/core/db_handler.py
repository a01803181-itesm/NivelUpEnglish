from dataclasses import dataclass
from contextlib import asynccontextmanager
from psycopg import AsyncConnection
from psycopg_pool import AsyncConnectionPool
from typing import AsyncGenerator
import urllib.parse

@dataclass
class Connection:
    host: str
    user: str
    password: str
    database: str
    port: str

class PostgreManager:
    __pool: AsyncConnectionPool
    __url: str
    def __init__(self, connection: Connection) -> None:
        self.__url = f'postgresql://{connection.user}:{urllib.parse.quote_plus(connection.password)}@{connection.host}:{connection.port}/{connection.database}'
        self.__pool: AsyncConnectionPool = AsyncConnectionPool(
            conninfo=self.__url,
            open=False,
            min_size=4,
            max_size=50
        )

    @property
    def db_url(self) -> str:
        return self.__url

    async def initialize(self) -> None:
        await self.__pool.open()

    async def close(self) -> None:
        await self.__pool.close()

    @asynccontextmanager
    async def get_connection(self) -> AsyncGenerator[AsyncConnection, None]:
        async with self.__pool.connection() as connection:
            yield connection