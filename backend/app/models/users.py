from pydantic import BaseModel, EmailStr
from beanie import Document

class User(Document):
    """
    User base model.
    """
    email: EmailStr
    password: str
    profile_name: str | None = None
    disabled: bool | None = None

    class Settings:
        name = "users" # the collection name in MongoDB

class UserPublic(BaseModel):
    """
    User response model.
    """
    email: EmailStr
    profile_name: str | None = None
    disabled: bool | None = None


class Users(BaseModel):
    """
    A model that list all users.
    """
    users: list[UserPublic] # avoid providing a top-level array in a JSON response that can be a vulnerability

class UserUpdate(BaseModel):
    profile_name: str | None = None
    disabled: bool | None = None