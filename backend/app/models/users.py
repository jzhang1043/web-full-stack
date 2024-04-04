from pydantic import BaseModel, EmailStr
from beanie import Document

class User(Document):
    """
    User: User base model.
    """
    email: EmailStr
    password: str
    profile_name: str | None = None
    disabled: bool | None = None

    class Settings:
        name = "users" # the collection name in MongoDB

class UserPublic(BaseModel):
    """
    UserPublic: User response model.
    """
    email: EmailStr
    profile_name: str | None = None
    disabled: bool | None = None


class Users(BaseModel):
    """
    Users: A model used to list all users.
    """
    users: list[UserPublic] # avoid providing a top-level array in a JSON response that can be a vulnerability


class UserUpdate(BaseModel):
    """
    UserUpdate: A model used to update a user.
    """
    profile_name: str | None = None
    disabled: bool | None = None


class Token(BaseModel):
    """
    Token: A model used for token.
    """
    access_token: str
    token_type: str