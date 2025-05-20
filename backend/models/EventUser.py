from sqlalchemy import Column, String, UUID, ForeignKey
from sqlalchemy.orm import relationship

from backend.db.db import Base


class EventUser(Base):
    __tablename__ = "event_user"
    __table_args__ = {"schema": "diplom"}

    id = Column(UUID, primary_key=True, index=True)
    user_id = Column(UUID, ForeignKey("diplom.sec_user.id"), nullable=False)
    event_id = Column(String, ForeignKey("diplom.event.id"), nullable=False)

    user = relationship("SecUser", back_populates = "event")
    events = relationship("Event", back_populates = "user")
