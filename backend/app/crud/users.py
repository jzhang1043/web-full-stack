from fastapi import HTTPException, status, Body
from app.models.users import User, UserPublic, UserUpdate
from app.core.security import hash_password


async def create_user(*, user: User = Body(...)):
    user_exists = await User.find_one(User.email == user.email)
    if user_exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    user.password = hash_password(user.password)
    new_user = await user.insert()
    return new_user


async def read_all_users(*, skip: int, limit: int):
    users = await User.find_all(skip=skip, limit=limit).to_list()
    users = [UserPublic(**user.model_dump()) for user in users] 
    return users


async def read_user_by_id(*, id: str):
    user = await User.get(id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"User {id} not found")
    return user


async def update_user_by_id(*, id: str, update_data: UserUpdate = Body(...)):
    print(update_data)
    update_data = update_data.model_dump(exclude_unset=True)
    user = await read_user_by_id(id=id)
    if len(update_data) == 0:
        return user
    updated_user = await user.set(update_data)
    return updated_user


async def delete_user_by_id(*, id: str):
    user = await read_user_by_id(id=id)
    await user.delete()
    