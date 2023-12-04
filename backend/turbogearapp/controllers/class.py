from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject, Course_Class
import transaction
import json
import os
import datetime
import utlis

class ClassController(TGController):
    @expose('json')
    def get_existing_classes(self, **kwargs):
        course_id = kwargs.get('course_id', '')
        session = DBSession()
        classes = []
        if course_id == '':
            classes = session.query(Course_Class).filter(Course_Class.enroll == False).all()
        else:
            # Check if course_id exists in the database
            course = session.query(Course).filter(Course.id == course_id).first()
            if course:
                classes = session.query(Course_Class).filter(Course_Class.course_id == course_id, Course_Class.enroll == False).all()
        return utlis.sqlalchemy_to_json(classes)
    
    @expose('json')
    def get_class(self, **kwargs):
        course_id = request.json['course_id']
        student_id = request.json['student_id']
        begin_time = datetime.strptime(request.json['begin_time'], '%Y-%m-%d %H:%M:%S')
        session = DBSession()
        course_class = session.query(Course_Class).filter(Course_Class.course_id == course_id,
                                                          Course_Class.student_id == student_id,
                                                          Course_Class.begin_time == begin_time).first()
        return utlis.sqlalchemy_to_json(course_class)

    @expose('json')
    def purpose_class(self, **kwargs):
        user_id=request.environ.get('REMOTE_USER')
        user_type = request.environ.get('USER_TYPE')
        if user_type != 'student':
            return dict(status='failed', message='Only student can purpose class.')
        course_id = request.json['course_id']
        student_id = request.json['student_id']
        begin_time = datetime.strptime(request.json['begin_time'], '%Y-%m-%d %H:%M:%S')
        end_time = datetime.strptime(request.json['end_time'], '%Y-%m-%d %H:%M:%S')

        # check time validity
        if begin_time > end_time:
            return dict(status='failed', message='begin_time should be earlier than end_time')
        elif begin_time < datetime.now():
            return dict(status='failed', message='begin_time should be later than now')
        
        duration = str(end_time - begin_time)
        session = DBSession()
        price = session.query(Course).filter(Course.id == course_id).first().price
        course_class = Course_Class(
            course_id = course_id,
            student_id = student_id,
            begin_time = begin_time,
            end_time = end_time,
            duration = duration,
            price = price,
            quant_rating = 5
        )
        session.add(course_class)
        transaction.commit()
        return dict(status='success', message='Class purpose successful.')
    
    @expose('json')
    def confirm_class(self, **kwargs):
        user_id=request.environ.get('REMOTE_USER')
        user_type = request.environ.get('USER_TYPE')
        if user_type != 'tutor':
            return dict(status='failed', message='Only tutor can confirm class.')
        course_id = request.json['course_id']
        student_id = request.json['student_id']
        begin_time = datetime.strptime(request.json['begin_time'], '%Y-%m-%d %H:%M:%S')
        end_time = datetime.strptime(request.json['end_time'], '%Y-%m-%d %H:%M:%S')
        session = DBSession()
        course_class = session.query(Course_Class).filter(Course_Class.course_id == course_id,
                                                          Course_Class.student_id == student_id,
                                                          Course_Class.begin_time == begin_time).first()
        course_class.confirmed = True
        transaction.commit()
        return dict(status='success', message='Class confirm successful.')
    
    @expose('json')
    def reject_class(self, **kwargs):
        user_id=request.environ.get('REMOTE_USER')
        user_type = request.environ.get('USER_TYPE')
        if user_type != 'tutor':
            return dict(status='failed', message='Only tutor can reject class.')
        course_id = request.json['course_id']
        student_id = request.json['student_id']
        begin_time = datetime.strptime(request.json['begin_time'], '%Y-%m-%d %H:%M:%S')
        end_time = datetime.strptime(request.json['end_time'], '%Y-%m-%d %H:%M:%S')
        session = DBSession()
        course_class = session.query(Course_Class).filter(Course_Class.course_id == course_id,
                                                          Course_Class.student_id == student_id,
                                                          Course_Class.begin_time == begin_time).first()
        course_class.confirmed = False
        transaction.commit()
        return dict(status='success', message='Class reject successful.')
    
    @expose('json')
    def delete_class(self, **kwargs):
        course_id = request.json['course_id']
        student_id = request.json['student_id']
        begin_time = datetime.strptime(request.json['begin_time'], '%Y-%m-%d %H:%M:%S')
        end_time = datetime.strptime(request.json['end_time'], '%Y-%m-%d %H:%M:%S')
        session = DBSession()
        course_class = session.query(Course_Class).filter(Course_Class.course_id == course_id,
                                                          Course_Class.student_id == student_id,
                                                          Course_Class.begin_time == begin_time).first()
        session.delete(course_class)
        transaction.commit()
        return dict(status='success', message='Class delete successful.')
    
    @expose('json')
    def take_class(self, **kwargs):
        course_id = request.json['course_id']
        student_id = request.json['student_id']
        begin_time = datetime.strptime(request.json['begin_time'], '%Y-%m-%d %H:%M:%S')
        end_time = datetime.strptime(request.json['end_time'], '%Y-%m-%d %H:%M:%S')
        side_note = request.json['side_note']
        session = DBSession()
        course_class = session.query(Course_Class).filter(Course_Class.course_id == course_id,
                                                          Course_Class.student_id == student_id,
                                                          Course_Class.begin_time == begin_time).first()
        course_class.taken = True
        course_class.side_note = side_note
        transaction.commit()
        return dict(status='success', message='Class take successful.')

    @expose('json')
    def review_class(self, **kwargs):
        user_id=request.environ.get('REMOTE_USER')
        user_type = request.environ.get('USER_TYPE')
        if user_type != 'student':
            return dict(status='failed', message='Only student can purpose class.')
        course_id = request.json['course_id']
        student_id = request.json['student_id']
        begin_time = datetime.strptime(request.json['begin_time'], '%Y-%m-%d %H:%M:%S')
        end_time = datetime.strptime(request.json['end_time'], '%Y-%m-%d %H:%M:%S')
        quant_rating = request.json['quant_rating']
        review = request.json['review']
        session = DBSession()
        course_class = session.query(Course_Class).filter(Course_Class.course_id == course_id,
                                                          Course_Class.student_id == student_id,
                                                          Course_Class.begin_time == begin_time).first()
        course_class.review = review
        transaction.commit()
        return dict(status='success', message='Class review successful.')