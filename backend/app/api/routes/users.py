from fastapi import APIRouter, status, Body, Query
from app.models.users import User, UserPublic, Users, UserUpdate
from app.crud.users import create_user, read_all_users, read_user_by_id, update_user_by_id, delete_user_by_id

router = APIRouter()

@router.post("/", response_model=UserPublic, status_code=status.HTTP_201_CREATED, response_description="User added into the database")
async def createUser(user: User = Body(...)): 
    return await create_user(user=user)


@router.get("/", response_model=Users, status_code=status.HTTP_200_OK, response_description="Revealed all users")
async def get_all_users(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1)):
    users = await read_all_users(skip=skip, limit=limit)
    return Users(users = users)

@router.get("/{id}", response_model=UserPublic, status_code=status.HTTP_200_OK, response_description= "Revealed a user by id")
async def get_user_by_id(id: str):    
    return await read_user_by_id(id=id)

@router.put("/{id}", response_model=UserPublic, status_code=status.HTTP_200_OK, response_description="Updated a user by id")
async def update_user(id: str, update_data: UserUpdate = Body(...)):
    return await update_user_by_id(id=id, update_data=update_data)

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT, response_description="Deleted a user by id")
async def delete_user(id: str):
    await delete_user_by_id(id=id)
