import os
import requests
import firebase_admin
from firebase_admin import auth, credentials
from dotenv import load_dotenv

load_dotenv("../.env.dev")

FIREBASE_WEB_API_KEY = os.getenv("FIREBASE_WEB_API_KEY")
TARGET_UID = os.getenv("TARGET_UID")

def get_bearer_token():
    if not firebase_admin._apps:
        cred = credentials.Certificate("../credentials.json")
        firebase_admin.initialize_app(cred)

    custom_token_bytes = auth.create_custom_token(TARGET_UID)
    custom_token = custom_token_bytes.decode("utf-8")

    url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key={FIREBASE_WEB_API_KEY}"

    payload = {
        "token": custom_token,
        "returnSecureToken": True
    }

    response = requests.post(url, json=payload)

    if response.status_code == 200:
        token = response.json().get("idToken")
        print("\n\x1b[102;30m===TEST BEARER TOKEN===\x1b[0m")
        print(f"\nBearer {token}\n")
    else:
        print("Login failed:", response.text)

if __name__ == "__main__":
    get_bearer_token()