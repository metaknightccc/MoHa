from sqlalchemy import Column, Integer, String, BigInteger, Float, Boolean, Text, ForeignKey, Date, DateTime
#from sqlalchemy.orm import relationship
from turbogearapp.model import DeclarativeBase, DBSession
from hashlib import sha256
from sqlalchemy.orm import relationship, synonym
import os
#added subject: token count, class: payment method, others implemented according to SRS4.0 Chapter9.1
class Tutor(DeclarativeBase):
    __tablename__ = 'tutor'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    pic = Column(String, nullable = True, default="./turbogearapp/public/assets/default.png")
    username = Column(String, nullable=False)#was: name
    email = Column(String, nullable=False)
    phone_number = Column(String, nullable=True)
    tokens = Column(Float, nullable = False, default= 0.0)
    #courses = relationship('Course', back_populates='tutor_id')
    preference = Column(Text, nullable=True) #preference of the student
    social_security_number = Column(String, nullable=False)# todo: encrypt using hash method
    _password = Column('password',String, nullable=False)
    @classmethod
    def _hash_password(cls, password):
        salt = sha256()
        salt.update(os.urandom(60))
        salt = salt.hexdigest()

        hash = sha256()
        # Make sure password is a str because we cannot hash unicode objects
        hash.update((password + salt).encode('utf-8'))
        hash = hash.hexdigest()

        password = salt + hash


        return password
    def _set_password(self, password):
        """Hash ``password`` on the fly and store its hashed version."""
        self._password = self._hash_password(password)

    def _get_password(self):
        """Return the hashed version of the password."""
        return self._password

    password = synonym('_password', descriptor=property(_get_password,
                                                        _set_password))

    def validate_password(self, password):
        """
        Check the password against existing credentials.

        :param password: the password that was provided by the user to
            try and authenticate. This is the clear text version that we will
            need to match against the hashed one in the database.
        :type password: string object.
        :return: Whether the password is valid.
        :rtype: bool

        """
        hash = sha256()
        hash.update((password + self.password[:64]).encode('utf-8'))
        return self.password[64:] == hash.hexdigest()


'''    
class Rating(DeclarativeBase):#made seperately to store user review and calculated rating based on tutor id
    __tablename__ = 'rating'
    tutor_id = Column(BigInteger, ForeignKey('tutor.id'), primary_key=True)
    student_id = Column(BigInteger, ForeignKey('student.id'), primary_key=True)
    quant_rating = Column(Integer, nullable=False, default=5) #range from 0-5. WARNING: data should be checked before logging in
    review = Column(Text, nullable=True, default= "User left with a good impression!")
'''
    

class Student(DeclarativeBase):
    __tablename__ = 'student'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    username = Column(String, nullable=False)#was: name
    email = Column(String, nullable=False)
    pic = Column(String, nullable = True, default="./turbogearapp/public/assets/default.png")
    phone_number = Column(String, nullable=True)
    tokens = Column(Float, nullable = False, default= 0.0)
    _password = Column('password',String, nullable=False)
    @classmethod
    def _hash_password(cls, password):
        salt = sha256()
        salt.update(os.urandom(60))
        salt = salt.hexdigest()

        hash = sha256()
        # Make sure password is a str because we cannot hash unicode objects
        hash.update((password + salt).encode('utf-8'))
        hash = hash.hexdigest()

        password = salt + hash


        return password
    def _set_password(self, password):
        """Hash ``password`` on the fly and store its hashed version."""
        self._password = self._hash_password(password)

    def _get_password(self):
        """Return the hashed version of the password."""
        return self._password

    password = synonym('_password', descriptor=property(_get_password,
                                                        _set_password))

    def validate_password(self, password):
        """
        Check the password against existing credentials.

        :param password: the password that was provided by the user to
            try and authenticate. This is the clear text version that we will
            need to match against the hashed one in the database.
        :type password: string object.
        :return: Whether the password is valid.
        :rtype: bool

        """
        hash = sha256()
        hash.update((password + self.password[:64]).encode('utf-8'))
        return self.password[64:] == hash.hexdigest()

class Card(DeclarativeBase): #Done: Encrypted
    __tablename__ = 'card'
    
    card_number = Column(String, primary_key=True, nullable=False)  # Primary key
    exp_date = Column(Date, nullable=False)

    def __init__(self, card_number, exp_date):
        self.card_number = self._hash_card_number(card_number)
        self.exp_date = exp_date

    @staticmethod
    def _hash_card_number(card_number):
        salt = os.urandom(32).hex()  # Generate a random 64-character hex salt

        # Hash the card number using SHA-256 and the salt
        hashed_card_number = sha256((card_number + salt).encode('utf-8')).hexdigest()

        return salt + hashed_card_number

    def validate_card_number(self, input_card_number):
        """
        Validate an input card number against the stored hashed card number.

        :param input_card_number: The clear text card number to validate.
        :type input_card_number: str
        :return: Whether the input card number is valid.
        :rtype: bool
        """
        salt = self.card_number[:64]
        hashed_input_card_number = self._hash_card_number(input_card_number)
        return self.card_number[64:] == hashed_input_card_number[64:]

    def __str__(self):
        return f"Card(card_number={self.card_number}, exp_date={self.exp_date})"
class Course(DeclarativeBase):
    __tablename__ = 'course'

    id = Column(BigInteger, primary_key=True, autoincrement=True)
    tutor_id = Column(BigInteger, ForeignKey('tutor.id'))
    name = Column(String, nullable=False)
    pic = Column(String, nullable = True, default="./turbogearapp/public/assets/default.png")
    subject_name = Column(String, ForeignKey('subject.subject_name'))
    type = Column(String, nullable=False)
    price = Column(Float, nullable=False, default=0.0)
    avg_rating = Column(Float, nullable=True)
    description = Column(Text, nullable=True)
    lemmas = Column(Text, nullable=True)
    zoom_link = Column(String, nullable=True)
    # def cal_rating():
    #     related_classes = Course_Class.query.filter_by(course_id=self.id, student_id=student_id).all()
    #     if related_classes:
    #         total_rating = sum([course_class.quant_rating for course_class in related_classes])
    #         avg_rating = total_rating / len(related_classes)
    #         #return average_rating
    #     else:
    #         avg_rating = None

   
    
class Course_Class(DeclarativeBase):
    __tablename__ = 'course_class'
    enroll = Column(Boolean, default= False)
    course_id = Column(BigInteger, ForeignKey('course.id'), primary_key=True)
    student_id = Column(BigInteger, ForeignKey('student.id'), primary_key=True)
    begin_time = Column(DateTime) #planned time to start
    end_time = Column(DateTime) #planned time to end
    t_begin_time = Column(DateTime)#true time started
    t_end_time = Column(DateTime)#true time ended
    duration = Column(BigInteger, nullable=True) #the real duration of the class taken, stored in seconds
    normal = Column(Boolean, default= True)
    side_note = Column(Text, nullable=True)
    taken =  Column(Boolean, default= False)
    price = Column(Float, nullable = False, default= 0.0)
    quant_rating = Column(Integer, nullable=False, default=5) #range from 0-5. WARNING: data should be checked before logging in
    review = Column(Text, nullable=True, default= "User left with a good impression!")
    
    
class Subject(DeclarativeBase):
    __tablename__ = 'subject'
    
    subject_name = Column(String, primary_key=True, nullable=False)
    major = Column(String, nullable=True)
    academic = Column(Boolean, nullable=False)
    
