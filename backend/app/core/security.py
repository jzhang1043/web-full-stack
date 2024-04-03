from datetime import datetime, timedelta, timezone
from typing import Dict
import bcrypt
import jwt

from app.core.config import get_settings

def token_response(token: str):
    return {"access_token": token}


def sign_jwt(user_id: str) -> Dict[str, str]:
    # Set the expiry time.
    expire = datetime.now(timezone.utc) + timedelta(minutes=get_settings().ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"user_id": user_id, "exp": expire}
    return token_response(jwt.encode(payload, get_settings().SECRET_KEY, algorithm="HS256"))


def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))