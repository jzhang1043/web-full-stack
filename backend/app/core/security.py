from datetime import datetime, timedelta, timezone
from app.core.config import get_settings
from typing import Dict
import bcrypt
import jwt


def token_response(token: str):
    return {"access_token": token}


def create_access_token(user_id: str) -> Dict[str, str]:
    expire = datetime.now(timezone.utc) + timedelta(minutes=get_settings().ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"user_id": user_id, "exp": expire}
    secret = get_settings().SECRET_KEY
    return token_response(jwt.encode(payload, secret, algorithm="HS256"))


def hash_password(password: str):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


def verify_password(plain_password: str, hashed_password: str):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def decode_jwt(token: str) -> dict:
    decoded_token = jwt.decode(token, get_settings().SECRET_KEY, algorithms=["HS256"])
    return decoded_token