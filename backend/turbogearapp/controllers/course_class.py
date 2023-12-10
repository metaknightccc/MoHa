from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject, Course_Class
import transaction
import json
import os
import datetime
from sqlalchemy.orm import aliased

def sqlalchemy_to_json(sqlalchemy_objects):
    result = []
    for obj in sqlalchemy_objects:
        obj_dict = {}
        for column in obj.__table__.columns:
            value = getattr(obj, column.name)
            # Convert datetime objects to string
            if isinstance(value, datetime.datetime):
                obj_dict[column.name] = value.isoformat()
            # Add more type checks as needed (e.g., for date, decimal.Decimal, etc.)
            else:
                obj_dict[column.name] = value
        result.append(obj_dict)
    # print(result)
    return result

def sqlalchemy_to_json_single(sqlalchemy_object):
    obj_dict = {}
    for column in sqlalchemy_object.__table__.columns:
        value = getattr(sqlalchemy_object, column.name)
        # Convert datetime objects to string
        if isinstance(value, datetime.datetime):
            obj_dict[column.name] = value.isoformat()
        # Add more type checks as needed (e.g., for date, decimal.Decimal, etc.)
        else:
            obj_dict[column.name] = value
    return obj_dict

def get_duration(begin_time, end_time):
    begin_h, begin_m = begin_time.split(':')
    end_h, end_m = end_time.split(':')
    return (int(end_h) - int(begin_h)) * 60 + (int(end_m) - int(begin_m))

def to_timestamp(date, time):
    return datetime.datetime.strptime(date + ' ' + time, '%Y-%m-%d %H:%M')

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
        return sqlalchemy_to_json(classes)
    
    # get all pending classes
    @expose('json')
    def get_classes(self, **kwargs):
        user_id=request.environ.get('REMOTE_USER')
        user_type = request.environ.get('USER_TYPE')
        session = DBSession()
        classes = []
        print(user_type)
        if user_type == 'student':
            classes = session.query(Course_Class).filter_by(student_id = user_id, enroll = False).all()
        elif user_type == 'tutor':
            course_ids = [course.id for course in session.query(Course).filter_by(tutor_id = user_id).all()]
            for course_id in course_ids:
                classes += session.query(Course_Class).filter_by(course_id = course_id, enroll = False).all()
        else:
            return dict(status='failed', message='Only student or tutor can get classes.')
        # add course info into response
        response = []
        for course_class in classes:
            course = session.query(Course).filter_by(id = course_class.course_id).first()
            class_dict = sqlalchemy_to_json_single(course_class)
            course_dict = sqlalchemy_to_json_single(course)
            response.append({**course_dict, **class_dict})
        return json.dumps(response)
            
        # json_data = json.dumps(sqlalchemy_to_json(classes))
        # return json_data.encode('utf-8')
    
    @expose('json')
    def get_enrolled_classes(self, **kwargs):
        user_id=request.environ.get('REMOTE_USER')
        user_type = request.environ.get('USER_TYPE')
        print("******************")
        print(user_id, user_type)
        print("******************")
        if user_type != 'student':
            return dict(status='failed', message='Only student can get enroll class.')
        session = DBSession()
        classes = session.query(Course_Class).filter(Course_Class.student_id == user_id, Course_Class.enroll == True).all()
        courses = []
        for course_class in classes:
            courses.append(session.query(Course).filter(Course.id == course_class.course_id).first())
        return dict(status='success', courses=sqlalchemy_to_json(courses))
        

    @expose('json')
    def purpose_class(self, **kwargs):
        # user_id=request.environ.get('REMOTE_USER')
        # user_type = request.environ.get('USER_TYPE')
        # if user_type != 'student':
        #     return dict(status='failed', message='Only student can purpose class.')
        course_id = request.json['course_id']
        student_id = request.json['user_id']
        begin_time = request.json['begin_time']
        end_time = request.json['end_time']
        date = request.json['date']
        price = request.json['course_price']

        # check time validity
        # if begin_time > end_time:
        #     return dict(status='failed', message='begin_time should be earlier than end_time')
        # elif begin_time < datetime.now():
        #     return dict(status='failed', message='begin_time should be later than now')
        print(date)
        print(begin_time)
        print(end_time)
        duration = get_duration(begin_time, end_time)
        cal_price = duration / 60 * price
        cal_price = round(cal_price, 2)
        session = DBSession()
        # price = session.query(Course).filter_by(id = course_id).first().price
        course_class = Course_Class(
            course_id = course_id,
            student_id = student_id,
            begin_time = to_timestamp(date, begin_time),
            end_time = to_timestamp(date, end_time),
            duration = duration,
            price = cal_price,
            quant_rating = 5
        )
        session.add(course_class)
        transaction.commit()
        return dict(status='success', message='Class purpose successful.')
    
    @expose('json')
    def confirm_class(self, **kwargs):
        # user_id=request.environ.get('REMOTE_USER')
        # user_type = request.environ.get('USER_TYPE')
        # if user_type != 'tutor':
        #     return dict(status='failed', message='Only tutor can confirm class.')
        course_id = request.json['course_id']
        student_id = request.json['student_id']
        begin_time = request.json['begin_time']
        end_time = request.json['end_time']
        confiremd = request.json['confirmed']
        session = DBSession()
        course_class = session.query(Course_Class).filter_by(course_id = course_id,
                                                          student_id = student_id,
                                                          begin_time = begin_time).first()
        course_class.confirmed = confiremd
        transaction.commit()
        return dict(status='success', message='Class confirm successful.')
    
    # @expose('json')
    # def reject_class(self, **kwargs):
    #     # user_id=request.environ.get('REMOTE_USER')
    #     # user_type = request.environ.get('USER_TYPE')
    #     # if user_type != 'tutor':
    #     #     return dict(status='failed', message='Only tutor can reject class.')
    #     course_id = request.json['course_id']
    #     student_id = request.json['student_id']
    #     begin_time = request.json['begin_time']
    #     end_time = request.json['end_time']
    #     session = DBSession()
    #     course_class = session.query(Course_Class).filter(course_id == course_id,
    #                                                       student_id == student_id,
    #                                                       begin_time == begin_time).first()
    #     course_class.confirmed = False
    #     transaction.commit()
    #     return dict(status='success', message='Class reject successful.')
    
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
    
    @expose('json') #WARNING: this function should no longer be called
    def cal_course_price(self):
        # course_classes = DBSession.query(Course_Class).all()
        # for course_class in course_classes:
        #     course_class.price = course_class.duration / 60 * course_class.course.price
        courses = DBSession.query(Course).all()
        
        for course in courses:
             # Use aliased to create a separate alias for Course_Class
            CourseClassAlias = aliased(Course_Class)

            # Fetch related classes using the aliased class
            related_classes = DBSession.query(CourseClassAlias).filter_by(course_id=course.id).all()
            
            if related_classes:
                for related_class in related_classes:
                    related_class.price = related_class.duration / 60 * course.price
        return dict(status='success', message='Class price calculate successful.')