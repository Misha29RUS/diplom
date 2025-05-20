from sqlalchemy import Column, String, UUID
from sqlalchemy.orm import relationship

from backend.db.db import Base


class ControlDocs(Base):
    __tablename__ = "control_docs"
    __table_args__ = {"schema": "diplom"}

    id = Column(String, primary_key=True, index=True)
    event_type_id = Column(UUID, nullable=False)
    doc_id = Column(UUID, nullable=False)
