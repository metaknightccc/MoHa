from sqlalchemy import Column, Integer, String, BigInteger, Float, Boolean, Text, ForeignKey, Date, DateTime
#from sqlalchemy.orm import relationship
from turbogearapp.model import DeclarativeBase, DBSession


#added subject: token count, class: payment method, others implemented according to SRS4.0 Chapter9.1
class Tutor(DeclarativeBase):
    __tablename__ = 'tutor'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    password = Column(String, nullable=False) # todo: encrypt using hash method
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    username = Column(String, nullable=False)#was: name
    email = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    tokens = Column(Float, nullable = False, default= 0.0)
    #courses = relationship('Course', back_populates='tutor_id')
    social_security_number = Column(String, nullable=False)# todo: encrypt using hash method

    
class Rating(DeclarativeBase):#made seperately to store user review and calculated rating based on tutor id
    __tablename__ = 'rating'
    tutor_id = Column(BigInteger, ForeignKey('tutor.id'), primary_key=True)
    student_id = Column(BigInteger, ForeignKey('student.id'), primary_key=True)
    quant_rating = Column(Integer, nullable=False, default=5) #range from 0-5. WARNING: data should be checked before logging in
    review = Column(Text, nullable=True, default= "User left with a good impression!")
    
    

class Student(DeclarativeBase):
    __tablename__ = 'student'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    password = Column(String, nullable=False) # todo: encrypt using hash method
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    username = Column(String, nullable=False)#was: name
    email = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    tokens = Column(Float, nullable = False, default= 0.0)

class Card(DeclarativeBase):# todo: should be encrypted
    __tablename__ = 'card'
    card_number = Column(String, primary_key=True, nullable=False)
    exp_date = Column(Date, nullable=False)
    csv = Column(String, nullable=False)
    
class Course(DeclarativeBase):
    __tablename__ = 'course'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    tutor_id = Column(BigInteger, ForeignKey('tutor.id'))
    name = Column(String, nullable=False)
    Subject_name = Column(String, ForeignKey('subject.subject_name'))
    type = Column(String, nullable=False)
    price = Column(Float, nullable = False, default= 0.0)
    
class Course_Class(DeclarativeBase):
    __tablename__ = 'course_class'
    course_id = Column(BigInteger, ForeignKey('course.id'), primary_key=True)
    student_id = Column(BigInteger, ForeignKey('student.id'), primary_key=True)
    begin_time = Column(DateTime) #planned time to start
    end_time = Column(DateTime) #planned time to end
    duration = Column(BigInteger, nullable=True) #the real duration of the class taken, stored in seconds
    normal = Column(Boolean, default= True)
    side_note = Column(Text, nullable=True)
    taken =  Column(Boolean, default= False)
    
class Subject(DeclarativeBase):
    __tablename__ = 'subject'
    
    subject_name = Column(String, primary_key=True, nullable=False)
    major = Column(String, nullable=True)
    academic = Column(Boolean, nullable=False)
    
