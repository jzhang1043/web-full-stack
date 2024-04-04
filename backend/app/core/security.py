from datetime import datetime, timedelta, timezone
from fastapi import HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from app.core.config import get_settings
import bcrypt
import jwt


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/token")

def hash_password(*, password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(*, plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(*, user_id: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(minutes=get_settings().ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": f"user:{user_id}", "exp": expire}
    secret = get_settings().SECRET_KEY
    return jwt.encode(payload, secret, algorithm="HS256")

def decode_access_token(*, access_token: str) -> dict:
    secret = get_settings().SECRET_KEY
    try:
        payload = jwt.decode(access_token, secret, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="decode_access_token: InvalidTokenError",
                headers={"WWW-Authenticate": "Bearer"},
            )
    return payload