from sqlalchemy import Column, String, UUID, ForeignKey
from sqlalchemy.orm import relationship

from backend.db.db import Base


class UserRelations(Base):
    __tablename__ = "user_relations"
    __table_args__ = {"schema": "diplom"}

    id = Column(UUID, primary_key=True, index=True)

    main_user_id = Column(UUID, ForeignKey("diplom.sec_user.id"), nullable=False)
    sub_user_id = Column(UUID, ForeignKey("diplom.sec_user.id"), nullable=False)


    main_user = relationship("SecUser", back_populates="main")
    sub_user = relationship("SecUser", back_populates="sub")