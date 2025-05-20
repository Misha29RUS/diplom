from anyio import run_process
from fastapi_users import fastapi_users
from fastapi import FastAPI

from backend.db.db import init_models
from backend.routers.Event import router as event
from backend.utils.auth.utils.user_auth import auth_backend
from starlette.middleware.cors import CORSMiddleware
from multiprocessing import Process
import asyncio

from uvicorn import Config, Server


app = FastAPI(title="Alpha Control", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["Content-Type", "Set-Cookie", "*"]
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth/forgot",
    tags=["auth"],
)

app.include_router(event)


def start_server():
    config = Config(app, host="127.0.0.1", port=8000, reload=True)
    server = Server(config)
    server.run()


if __name__ == "__main__":
    import asyncio
    from backend.db.db import init_models
    asyncio.run(init_models())
    p = Process(target=start_server)
    p.start()
    p.join()
