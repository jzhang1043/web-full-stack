from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.db import init_database
from app.api.main import api_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_database()
    yield
    # after yield: after the application is finished

app = FastAPI(lifespan=lifespan)


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=['*'],
#     allow_credentials=True,
#     allow_methods=['*'],
#     allow_headers=['*'],
# )

# app.include_router(api_router, prefix=config.get_settings().API_V1_STR)