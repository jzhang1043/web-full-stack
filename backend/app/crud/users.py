from fastapi import HTTPException, status, Body
from app.models.users import User, UserPublic, UserUpdate, Users
from app.core import security
from beanie import PydanticObjectId

async def create_user(*, user: User = Body(...)) -> User:
    user_exists = await User.find_one(User.email==user.email)
    if user_exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                            detail="Email already registered")
    user.password = security.hash_password(password=user.password)
    new_user = await user.insert()
    return new_user


async def read_all_users(*, skip: int, limit: int) -> Users:
    users = await User.find_all(skip=skip, limit=limit).to_list()
    users = [UserPublic(**user.model_dump()) for user in users] 
    return Users(users=users)


async def read_user_by_id(*, user_id: str) -> User:
    try:
        PydanticObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail=f"{user_id} is not a valid ObjectId")
    user = await User.get(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User {user_id} not found")
    return user


async def read_user_by_email(*, email: str) -> User:
    user = await User.find_one(User.email==email)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"User {email} not found")
    return user


async def update_user_by_id(*, user_id: str, update_data: UserUpdate = Body(...)) -> User:
    update_data = update_data.model_dump(exclude_unset=True)
    user = await read_user_by_id(user_id=user_id)
    if len(update_data) == 0:
        return user
    updated_user = await user.set(update_data)
    return updated_user


async def delete_user_by_id(*, user_id: str) -> None:
    user = await read_user_by_id(user_id=user_id)
    await user.delete()
    