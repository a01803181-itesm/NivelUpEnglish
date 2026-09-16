import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "NivelUp English API"

    FIREBASE_CREDENTIALS_PATH: str = "credentials.json"

    DB_NAME: str
    DB_HOST: str
    DB_PASSWORD: str
    DB_USER: str
    DB_PORT: str

    ALLOWED_ORIGINS: list[str] = ['*'] # Temporary config, quite unsecure for deployment. TODO: restrict origins allowed to communicate with FastAPI

    model_config = SettingsConfigDict(
        env_file=os.getenv("ENV_FILE", ".env.prod"),
        extra="ignore"
    )

settings = Settings()