from sqlalchemy import Column, String, UUID
from sqlalchemy.orm import relationship

from backend.db.db import Base


class SecUser(Base):
    __tablename__ = "sec_user"
    __table_args__ = {"schema": "diplom"}

    id = Column(UUID, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    login = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    roles = relationship("UserRole", back_populates="user")
    sub = relationship("UserRelations", back_populates = "sub_user")
    main = relationship("UserRelations", back_populates = "main_user")
    event = relationship("EventUser", back_populates = "user")