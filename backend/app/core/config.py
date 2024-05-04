from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import computed_field
from functools import lru_cache

class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_ignore_empty=True, extra="ignore")

    # api version
    API_V1_STR: str = "/api/v1"

    # MongoDB settings
    MONGODB_USERNAME: str
    MONGODB_PASSWORD: str
    CLUSTER_URL: str
    DEFAULT_DB_NAME: str
    APP_NAME: str

    @computed_field  # type: ignore[misc]
    @property
    def MONGODB_URI(self) -> str:
        username = self.MONGODB_USERNAME
        password = self.MONGODB_PASSWORD
        cluster_url = self.CLUSTER_URL
        default_db_name = self.DEFAULT_DB_NAME
        app_name = self.APP_NAME
        return f"mongodb+srv://{username}:{password}@{cluster_url}/{default_db_name}?retryWrites=true&w=majority&appName={app_name}"

    # JWT
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60  # * 24 * 8 60 minutes * 24 hours * 8 days = 8 days

@lru_cache
def get_settings():
    return Settings()