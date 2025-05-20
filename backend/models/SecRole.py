from sqlalchemy import Column, String, UUID
from sqlalchemy.orm import relationship

from backend.db.db import Base


class SecRole(Base):
    __tablename__ = "sec_role"
    __table_args__ = {"schema": "diplom"}

    id = Column(UUID, primary_key=True, index=True)
    name = Column(String, nullable=False)

    permissions = relationship("RolePermission", back_populates="role")
    users = relationship("UserRole", back_populates="role")