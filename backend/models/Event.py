from sqlalchemy import Column, String, UUID
from sqlalchemy.orm import relationship

from backend.db.db import Base


class Event(Base):
    __tablename__ = "event"
    __table_args__ = {"schema": "diplom"}

    id = Column(String, primary_key=True, index=True)
    status = Column(String, nullable=False)


    user = relationship("EventUser", back_populates="event")