from fastapi import HTTPException, status, Depends
from app.models.users import User
from app.crud import users
from app.core import security

async def authenticate_user(*, email: str, password: str) -> User:
    """
    login_for_access_token: verify the user's credential and return the user's record in database
    """
    authError =  HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    try:
        user = await users.read_user_by_email(email=email)
    except Exception as e:
        raise authError
    if not security.verify_password(plain_password=password, hashed_password=user.password):
        raise authError
    return user

async def sign_jwt(*, email: str, password: str) -> str:
    """
    sign_jwt: verify the user and return a new JWT access token.
    """
    user = await authenticate_user(email=email, password=password)
    if user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Inactive user")
    access_token = security.create_access_token(user_id=str(user.id))
    return access_token


async def get_current_user(*, access_token: str = Depends(security.oauth2_scheme)) -> User:
    """
    get_current_user: verify the access token and return the current user's record in database
    """
    payload = security.decode_access_token(access_token=access_token)
    try:
        prefix, user_id = payload.get("sub").split(":")
        if prefix != "user" or not user_id:
            raise ValueError()
        user = await users.read_user_by_id(user_id=user_id) # this can also raise error if the user is not found
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_active_user(*, current_user: User = Depends(get_current_user)) -> User:
    """
    get_current_active_user: return a current active user
    """
    if current_user.disabled:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Inactive user")
    return current_user

