from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.db import init_database
from app.api import api_router
from app.models.users import User
from app.core.config import get_settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_database()
    yield
    # after yield: after the application is finished

app = FastAPI(lifespan=lifespan)
user_collection = User

@app.get("/")
async def read_root():
    
    return {"message": "Welcome to this fantastic app."}


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  # Adjust this in production
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

app.include_router(api_router, prefix=get_settings().API_V1_STR)