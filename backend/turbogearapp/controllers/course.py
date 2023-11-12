# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject
import transaction
import json
import os
from PIL import Image


class CourseController(TGController):
    @expose('json')
    def get_existing_subjects(self):
        existing_subjects = DBSession.query(Subject).all()
        subjects = [{'subject_name': subject.subject_name, 'major': subject.major, 'academic': subject.academic} for subject in existing_subjects]
        return json.dumps(subjects).encode('utf-8')

    @expose('json')
    def add_course(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
        print(user_type)
        #print(request.environ)
        print('=====user_type=====')
        if user_type != 'tutor':
            return dict(status='failed', message='User is not a tutor')

        # Get the tutor's ID
        tutor_id = request.environ.get('REMOTE_USER')

        new_course = Course(
            tutor_id=tutor_id,
            name=request.json['name'],
            subject_name=request.json['subject_name'],
            type=request.json['type'],
            price=float(request.json['price']),  # Parse price as a float
            #pic=request.json['pic'],  # Add pic
            description=request.json.get('description'),  # Optionally provide description
        )

        coursecheck = DBSession.query(Subject).filter_by(subject_name=new_course.subject_name).first()
        if coursecheck:
            DBSession.add(new_course)
        else:
            newsub = Subject(
                subject_name=request.json['subject_name'],
                major=request.json['major'],
                academic=request.json['academic'] == 'true',  # Parse academic as a boolean
            )
            DBSession.add(newsub)
            transaction.commit()
            DBSession.add(new_course)
        transaction.commit()

        return dict(page='add_course')
    
    @expose('json')
    def get_course_pic(self, **kwargs):
        if 'pic' not in request.json:
            return dict(status='failed', message='No file uploaded')
        print('=====Loading pic=====')
        tutor_id = request.environ.get('REMOTE_USER')
        uploaded_file = request.json['pic']
        filename = f'user_{tutor_id}.png'  # Adjust file naming as needed

        # Change the path as per your system
        file_path = os.path.join('./assets/course_pic', filename)

        with open(file_path, 'wb') as f:
            f.write(uploaded_file.file.read())

        return dict(status='success', message='File uploaded')

        