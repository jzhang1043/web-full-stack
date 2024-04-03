from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import get_settings
from beanie import init_beanie
import app.models as models


async def init_database():
    client = AsyncIOMotorClient(get_settings().MONGODB_URI)
    await init_beanie(database=client.get_default_database(), document_models=models.__all__)
