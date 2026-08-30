from fastapi import FastAPI, Depends, HTTPException, status, Path
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from db_handler import Connection, PostgreManager
from dotenv import load_dotenv
from contextlib import asynccontextmanager
from typing import Annotated, AsyncGenerator
from psycopg import AsyncConnection
from db_schemas import CreateGroup, CreateCustomer, CreateStudent
import os

load_dotenv()
connection: Connection = Connection(
    database=os.getenv('DB_NAME', ""),
    host=os.getenv('DB_HOST', "postgres"),
    password=os.getenv('DB_PASSWORD', ""),
    user=os.getenv('DB_USER', "postgres"),
    port=os.getenv('DB_PORT', "5432")
)
db_manager: PostgreManager = PostgreManager(connection)

@asynccontextmanager
async def lifespan(app: FastAPI):
    await db_manager.initialize()
    yield
    await db_manager.close()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Temporary config, quite unsecure for deployment. TODO: restrict origins allowed to communicate with FastAPI
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

async def get_db() -> AsyncGenerator[AsyncConnection, None]:
    async with db_manager.get_connection() as conn:
        yield conn

type DBSession = Annotated[AsyncConnection, Depends(get_db)]

@app.get('/check')
def test_server_connection():
    return { 'message': 'herkese merhaba!!' }

@app.get('/students')
async def read_students(db: DBSession):
    async with db.cursor() as cur:
        await cur.execute("SELECT * FROM students;")
        return await cur.fetchall()

@app.get('/students/id/{student_id}')
async def read_student(
    db: DBSession,
    student_id: int = Path(title="Student ID of the student to get", ge=1)
):
    async with db.cursor() as cur:
        await cur.execute(
            "SELECT * FROM students WHERE student_id = %s;",
            (student_id,)
        )
        row = await cur.fetchone()

        if not row:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Student with ID {student_id} not found"
            )

        return {
            "student_id": row[0],
            "customer_jid": row[1],
            "group_id": row[2],
            "full_name": row[3],
            "placement_test": row[4],
            "sample_Class": row[5]
        }

@app.get('/groups')
async def read_groups(db: DBSession):
    async with db.cursor() as cur:
        await cur.execute("SELECT * FROM groups;")
        return await cur.fetchall()

@app.get('/groups/id/{group_id}')
async def read_group(
    group_id: int,
    db: DBSession
):
    async with db.cursor() as cur:
        await cur.execute("SELECT * FROM groups WHERE group_id = %s;", (group_id,))

        row = await cur.fetchone()

        if not row:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Group with ID {group_id} not found"
            )

        return {
            "group_id": row[0],
            "level": row[1],
            "schedule_time_start": row[2],
            "schedule_time_finish": row[3],
            "date_start": row[4],
            "date_finish": row[5]
        }

@app.post('/groups/', status_code=status.HTTP_201_CREATED)
async def create_group(
    group_data: CreateGroup,
    db: DBSession
) -> dict[str, str | int]:
    async with db.cursor() as cur:
        await cur.execute(
            """
            INSERT INTO groups
            (level, schedule_time_start, schedule_time_finish, date_Start, date_finish)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING group_id;
            """,
            (
                group_data.level,
                group_data.schedule_time_start,
                group_data.schedule_time_finish,
                group_data.date_start,
                group_data.date_finish
            )
        )
        row = await cur.fetchone()

        if not row:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database failed to return the new group ID"
            )
        new_group_id: int = row[0]
        return {
            "group_id": new_group_id,
            "message": "Group created successfully"
        }

@app.get('/customers')
async def read_customers(db: DBSession):
    async with db.cursor() as cur:
        await cur.execute("SELECT * FROM customers;")
        return await cur.fetchall()

@app.get('/customers/id/{customer_jid}')
async def read_customer(
    customer_jid: str,
    db: DBSession
):
    async with db.cursor() as cur:
        await cur.execute("SELECT * FROM customers WHERE jid = %s;", (customer_jid,))

        row = await cur.fetchone()

        if not row:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Customer with ID {customer_jid} not found"
            )

        return {
            "jid": row[0],
            "full_name": row[1],
            "nickname": row[2],
            "phone_number": row[3]
        }

@app.post('/customers/', status_code=status.HTTP_201_CREATED)
async def create_customer(
    customer_data: CreateCustomer,
    db: DBSession
) -> dict[str, str]:
    async with db.cursor() as cur:
        await cur.execute(
            """
            INSERT INTO customers
            (jid, full_name, nickname, phone_number)
            VALUES
            (%s, %s, %s, %s)
            RETURNING jid;
            """,
            (
                customer_data.jid,
                customer_data.full_name,
                customer_data.nickname,
                customer_data.phone_number
            )
        )
        row = await cur.fetchone()
        if not row:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database failed to return the new customer JID"
            )
        new_customer_jid: str = row[0]
        return {
            "customer_jid": new_customer_jid,
            "message": "Customer created successfully"
        }


@app.post('/students/')
async def create_student(
    student_data: CreateStudent,
    db: DBSession
) -> dict[str, str | int]:
    async with db.cursor() as cur:
        await cur.execute(
            """
            INSERT INTO students
            (customer_jid, group_id, full_name, placement_test, sample_class)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING student_id;
            """,
            (
                student_data.customer_jid,
                student_data.group_id,
                student_data.full_name,
                student_data.placement_test,
                student_data.sample_class
            )
        )
        row = await cur.fetchone()
        if not row:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Database failed to return the new student ID"
            )
        new_student_id: int = row[0]
        return {
            "student_id": new_student_id,
            "message": "Student created successfully"
        }

handler: Mangum = Mangum(app=app)