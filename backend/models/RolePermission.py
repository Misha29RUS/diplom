from sqlalchemy import Column, String, UUID, ForeignKey
from sqlalchemy.orm import relationship

from backend.db.db import Base


class RolePermission(Base):
    __tablename__ = "role_permission"
    __table_args__ = {"schema": "diplom"}

    id = Column(UUID, primary_key=True, index=True)
    permission_id = Column(UUID, ForeignKey("diplom.sec_permission.id"), nullable=False)
    role_id = Column(UUID, ForeignKey("diplom.sec_role.id"), nullable=False)

    role = relationship("SecRole", back_populates="permissions")
    permission = relationship("SecPermission", back_populates="roles")