import firebase_admin
from firebase_admin import credentials
from app.core.config import settings

def init_firebase():
    if not firebase_admin._apps:
        cred_path: str = settings.FIREBASE_CREDENTIALS_PATH
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)