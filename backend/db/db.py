from sqlalchemy.ext.asyncio import async_sessionmaker, create_async_engine

from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

#Подключение к постгрессу где postgres:postgres - login:pass
engine = create_async_engine("postgresql+asyncpg://postgres:postgres@localhost:5432/postgres", echo=True)

async def init_models():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async_session_maker = async_sessionmaker(engine, expire_on_commit=False)


async def get_async_session():
    async with async_session_maker() as session:
        yield session
