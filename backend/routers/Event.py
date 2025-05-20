from uuid import UUID

from backend.utils.auth.utils.user_auth import current_user

from backend.db.db import get_async_session
from backend.models import Event, EventUser, SecUser

from fastapi import APIRouter, Depends, HTTPException, Query, Security, security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter(prefix="/events", tags=["events"])


class EventUpdate(BaseModel):
    status: str


class EventResponse(BaseModel):
    id: str
    status: str
    event_type: str
    user_id: Optional[UUID]


@router.patch("/{event_id}", response_model=EventResponse)
async def update_event_status(
        event_id: str,
        update_data: EventUpdate,
        session: AsyncSession = Depends(get_async_session),
        current_user: SecUser = Depends(current_user)
):
    event = await session.scalar(
        select(Event)
        .join(EventUser)
        .where(and_(
            Event.id == event_id,
            EventUser.user_id == current_user.id
        ))
    )

    if not event:
        raise HTTPException(status_code=404, detail="Event not found or access denied")

    event.status = update_data.status
    await session.commit()
    await session.refresh(event)

    return event



@router.get("/", response_model=List[EventResponse])
async def get_events(
        status: Optional[str] = Query(None),
        event_type: Optional[str] = Query(None),
        user_id: Optional[UUID] = Query(None, description="Только для админов"),
        show_all: bool = Query(False, description="Только для админов"),
        session: AsyncSession = Depends(get_async_session),
        # credentials: HTTPAuthorizationCredentials = Depends(security),
        current_user: SecUser = Depends(current_user)
):
    query = select(Event)
    if not current_user.is_admin:
        query = query.join(EventUser).where(EventUser.user_id == current_user.id)
    elif user_id:
        query = query.join(EventUser).where(EventUser.user_id == user_id)
    elif show_all:
        pass

    if status:
        query = query.where(Event.status == status)
    if event_type:
        query = query.where(Event.event_type == event_type)

    result = await session.execute(query)
    events = result.scalars().all()

    response = []
    for event in events:
        event_data = {
            "id": event.id,
            "status": event.status,
            "event_type": event.event_type
        }
        if current_user.is_admin:
            event_data["user_id"] = event.users[0].user_id if event.users else None
        response.append(event_data)

    return response