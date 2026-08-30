from enum import Enum
from datetime import date, time
from pydantic import BaseModel

class WeekDays(str, Enum):
    MON = "Mon",
    TUE = "Tue",
    WED = "Wed",
    THU = "Thu",
    FRI = "Fri",
    SAT = "Sat",
    SUN = "Sun"

class EnglishLevel(str, Enum):
    A1 = "A1"
    A2 = "A2"
    B1 = "B1"
    B2 = "B2"
    C1 = "C1"

class CreateGroup(BaseModel):
    level: EnglishLevel
    schedule_time_start: time
    schedule_time_finish: time
    date_start: date
    date_finish: date

class CreateCustomer(BaseModel):
    jid: str
    full_name: str
    nickname: str
    phone_number: str

class CreateStudent(BaseModel):
    customer_jid: str
    group_id: int
    full_name: str
    placement_test: int
    sample_class: bool