from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from typing import List
from sqlalchemy import delete, select
from pydantic import BaseModel

from backend.utils.auth.utils.user_auth import current_user

from backend.db.db import get_async_session
from backend.models import Event, EventUser, SecUser, ControlDocs

router = APIRouter(prefix="/control-docs", tags=["Control Documents"])


class ControlDocsRequest(BaseModel):
    event_type_id: UUID
    doc_ids: List[UUID]


@router.post("/", status_code=201)
async def update_control_docs(
        data: ControlDocsRequest,
        session: AsyncSession = Depends(get_async_session),
        current_user: SecUser = Depends(current_user)
):
    await session.execute(
        delete(ControlDocs)
        .where(ControlDocs.event_type_id == data.event_type_id)
    )

    session.add_all([
        ControlDocs(
            event_type_id=data.event_type_id,
            doc_id=doc_id
        ) for doc_id in data.doc_ids
    ])

    await session.commit()
    return {"message": "Document links updated successfully"}


@router.get("/{event_type_id}")
async def get_control_docs(
        event_type_id: UUID,
        session: AsyncSession = Depends(get_async_session)
):
    result = await session.execute(
        select(ControlDocs.doc_id)
        .where(ControlDocs.event_type_id == event_type_id)
    )
    return {"doc_ids": [row[0] for row in result.all()]}