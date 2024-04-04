from fastapi import APIRouter, status, Body, Query, Depends
from app.models.users import User, UserPublic, Users, UserUpdate
from app.crud import users, auth

router = APIRouter()

@router.post("/", response_model=UserPublic, status_code=status.HTTP_201_CREATED, response_description="User added into the database")
async def create_user(user: User = Body(...)): 
    return await users.create_user(user=user)


@router.get("/", response_model=Users, status_code=status.HTTP_200_OK, response_description="Revealed all users")
async def get_all_users(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1)):
    all_users = await users.read_all_users(skip=skip, limit=limit)
    return all_users

@router.get("/me", response_model=UserPublic, status_code=status.HTTP_200_OK, response_description= "Revealed the current active user")
async def get_users_me(current_user: User = Depends(auth.get_current_active_user)):
    return current_user

@router.get("/{user_id}", response_model=UserPublic, status_code=status.HTTP_200_OK, response_description= "Revealed a user by id")
async def get_user_by_id(user_id: str):    
    return await users.read_user_by_id(user_id=user_id)


@router.put("/{user_id}", response_model=UserPublic, status_code=status.HTTP_200_OK, response_description="Updated a user by id")
async def update_user(user_id: str, update_data: UserUpdate = Body(...)):
    return await users.update_user_by_id(user_id=user_id, update_data=update_data)


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT, response_description="Deleted a user by id")
async def delete_user(user_id: str):
    await users.delete_user_by_id(user_id=user_id)