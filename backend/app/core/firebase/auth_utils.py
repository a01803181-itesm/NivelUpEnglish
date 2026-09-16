from firebase_admin import auth
import logging

logger = logging.getLogger(__name__)

def verify_firebase_token(token: str) -> dict | None:
    try:
        return auth.verify_id_token(token)
    except Exception as e:
        logger.error(f"Firebase token verification failed: {e}")
        return None