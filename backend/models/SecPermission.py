from sqlalchemy import Column, String, UUID
from sqlalchemy.orm import relationship

from backend.db.db import Base


class SecPermission(Base):
    __tablename__ = "sec_permission"
    __table_args__ = {"schema": "diplom"}

    id = Column(UUID, primary_key=True, index=True)
    permission = Column(String, nullable=False)

    roles = relationship("RolePermission", back_populates="permission")