from pydantic import BaseModel, Field, EmailStr, SecretStr, field_serializer, field_validator
from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from beanie import Document

PyObjectId = Annotated[str, BeforeValidator(str)]


class User(Document):
    """
    Serves as a parent class from which other user-related models inherit.
    """
    id: PyObjectId | None = Field(alias="_id", default=None)
    email: EmailStr 
    profile_name: str | None = None
    disabled: bool | None = None

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True


# class UserCreate(User):
#     """
#     Validates data for new user registration before it's processed and stored in the database.
#     """
#     password: SecretStr

#     @field_validator('password')
#     def password_must_be_strong(cls, v):
#         if len(v) < 8:
#             raise ValueError('Password must be at least 8 characters long.')
#         if not any(char.isupper() for char in v.get_secret_value()):
#             raise ValueError('Password must contain at least one uppercase character.')
#         if not any(char.islower() for char in v.get_secret_value()):
#             raise ValueError('Password must contain at least one lowercase character.')
#         if not any(char.isdigit() for char in v.get_secret_value()):
#             raise ValueError('Password must contain at least one digit.')
#         return v
    
#     @field_serializer('password', when_used='json')
#     def dump_secret(self, v):
#         return v.get_secret_value()


# class UserUpdate(BaseModel):
#     """
#     Validates data when updating a user's information.
#     """
#     profile_name: str | None = None


# class UserPublic(BaseModel):
#     """
#     Used in API responses where user information needs to be returned.
#     """
#     id: PyObjectId = Field(alias="_id", default=None)
#     email: EmailStr


#     class Config:
#         populate_by_name = True
#         arbitrary_types_allowed = True


# class UserInDB(User):
#     """
#     Used internally within the backend for operations involving user data retrieval or manipulation in the database.
#     """
#     hashed_password: str


# class Users(BaseModel):
#     """
#     Used for getting all users and avoid providing a top-level array in a JSON response that can be a vulnerability.
#     """
#     users: list[UserPublic]


# class Token(BaseModel):
#     access_token: str
#     token_type: str

# class TokenData(BaseModel):
#     id: str | None = None

# class UserAuth(BaseModel):
#     user: UserPublic
#     token: Token


# class UserProfile(BaseModel):
#     """
#     Used for detailed user profiles, allowing users to view or edit their information.
#     """
#     pass


# class UserPermission(BaseModel):
#     """
#     Used to implement role-based access control (RBAC) or permission-based features in the application.
#     """
#     pass


# class UserAudit(BaseModel):
#     """
#     Used for tracking changes, logging user actions, and maintaining a history of user-related events for security and compliance.
#     """
#     pass