from fastapi import APIRouter, status, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.crud.auth import sign_jwt
from app.models.users import Token

router = APIRouter()

@router.post("/token", response_model=Token, status_code=status.HTTP_200_OK, response_description="User logged in and access token is signed")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm=Depends()):    
    access_token = await sign_jwt(email=form_data.username, password=form_data.password)
    return Token(access_token=access_token, token_type="bearer")
