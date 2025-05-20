from fastapi import Depends, Request
from fastapi_users import BaseUserManager, UUIDIDMixin, exceptions, models, schemas
from fastapi_users import FastAPIUsers
from uuid import UUID
from backend.models import SecUser
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession
from backend.db.db import get_async_session
from fastapi_users.authentication import CookieTransport
from fastapi_users.authentication import AuthenticationBackend, JWTStrategy




cookie_transport = CookieTransport(cookie_name="accessToken", cookie_max_age=150000)
SECRET = "SECRET"

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=150000)

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)

async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, SecUser)

class UserManager(UUIDIDMixin, BaseUserManager[SecUser, UUID]):
    reset_password_token_secret = SECRET
    verification_token_secret = SECRET

    async def on_after_forgot_password(
        self, user: SecUser, token: str, request: Request | None = None
    ):
        print(f"User {user.id} requested password reset. Token: {token}")
        # Здесь должна быть ваша логика отправки письма (например, через SMTP)
        # await send_reset_password_email(user.login, token)

    async def on_after_request_verify(
        self, user: SecUser, token: str, request: Request | None = None
    ):
        print(f"Verification requested for user {user.id}. Token: {token}")

    async def create(
        self,
        user_create: schemas.UC,
        safe: bool = False,
        request: Request | None = None,
    ) -> models.UP:

        existing_user = await self.user_db.get_by_email(user_create.login)
        if existing_user is not None:
            raise exceptions.UserAlreadyExists()

        user_dict = {
            "login": user_create.login,
            "full_name": user_create.full_name or user_create.login,
            "password": self.password_helper.hash(user_create.password),
        }

        created_user = await self.user_db.create(user_dict)
        await self.on_after_register(created_user, request)
        return created_user

async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)

fastapi_users = FastAPIUsers[SecUser, UUID](
    get_user_manager,
    [auth_backend],
)

current_user = fastapi_users.current_user()