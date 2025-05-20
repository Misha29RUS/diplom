from sqlalchemy import Column, String, UUID, ForeignKey
from sqlalchemy.orm import relationship

from backend.db.db import Base


class UserRole(Base):
    __tablename__ = "user_role"
    __table_args__ = {"schema": "diplom"}

    id = Column(UUID, primary_key=True, index=True)
    role_id = Column(UUID, ForeignKey("diplom.sec_role.id"), nullable=False)
    user_id = Column(UUID, ForeignKey("diplom.sec_user.id"), nullable=False)

    role = relationship("SecRole", back_populates="users")
    user = relationship("SecUser", back_populates="roles")