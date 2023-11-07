# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject
import transaction
import json
import os

class DashboardController(TGController):
    @expose('json')
    def get_existing_subjects(self):
        existing_subjects = DBSession.query(Subject).all()
        subjects = [{'subject_name': subject.subject_name, 'major': subject.major, 'academic': subject.academic} for subject in existing_subjects]
        return json.dumps(subjects).encode('utf-8')

    @expose('json')
    def index(self, **kwargs):
        return dict(page='profile')

    @expose('json')
    def course(self, **kwargs):
        return dict(page='course')

    @expose('json')
    def security(self, **kwargs):
        return dict(page='security')

    @expose('json')
    def add_course(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
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
            pic=request.json['pic'],  # Add pic
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
    def upload_image(self, **kwargs):
        file=request.params['fileaaaa']
        print(file)
        print('==========================')
        print(request.body)
        print('==========================')
        print(request.json)
        print('==========================123')
        
        # file=request.json['file']
        # if file:
        #     filename = file.filename
        #     file.save(os.path.join('../react-app/src/assets', filename))
        #     print('==========================')
        #     return dict(status='success', message='Image uploaded successfully')
        

