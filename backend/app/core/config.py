import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "NivelUp English API"

    DB_NAME: str = os.getenv('DB_NAME', '')
    DB_HOST: str = os.getenv('DB_HOST', 'postgres')
    DB_PASSWORD: str = os.getenv('DB_PASSWORD', '')
    DB_USER: str =os.getenv('DB_USER', 'postgres')
    DB_PORT: str = os.getenv('DB_PORT', '5432')

    ALLOWED_ORIGINS: list[str] = ['*'] # Temporary config, quite unsecure for deployment. TODO: restrict origins allowed to communicate with FastAPI

settings = Settings()