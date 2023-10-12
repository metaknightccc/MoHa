from sqlalchemy import Column, Integer, String
from turbogearapp.model import DeclarativeBase, DBSession

class Tutor(DeclarativeBase):
    __tablename__ = 'tutor'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    account = Column(String, nullable=False)

class Student(DeclarativeBase):
    __tablename__ = 'student'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    account = Column(String, nullable=False)

class Course(DeclarativeBase):
    __tablename__ = 'course'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)