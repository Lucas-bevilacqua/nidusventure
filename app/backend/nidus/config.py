from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./nidus_dev.db"
    ai_default_provider: str = "mock"

    anthropic_api_key: str = ""
    anthropic_model: str = "claude-opus-4-8"  # padrao; claude-sonnet-5 e opcao mais barata
    openai_api_key: str = ""
    openai_model: str = "gpt-4o"

    openrouter_api_key: str = ""
    openrouter_model: str = "openai/gpt-4o-mini"
    openrouter_base_url: str = "https://openrouter.ai/api/v1"

    app_base_url: str = "http://127.0.0.1:8010"
    port: int = 8010


settings = Settings()
