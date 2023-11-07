# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject
import transaction
import json
import os
from PIL import Image

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
        # print('==============122121221============')
        uploadImg=request.params['fileaaaa']
        # print(uploadImg)
        print('==========================')
        img=Image.open(uploadImg.file)
        # print(img.size)
        # img.save('../react-app/src/assets/'+uploadImg.filename)
        
        user_type = request.environ.get('USER_TYPE')
        user_id = str(request.environ.get('REMOTE_USER'))
        # print(user_id,user_type)
        # print(type(user_id))
        img.save('../react-app/public/assets/'+uploadImg.filename)
        path_name='./assets/'+uploadImg.filename

        #TODO: delete the original pic and save every pic with a unique name

        student = DBSession.query(Student).filter(Student.id == user_id).first()
        if student:
            student.pic = path_name
            transaction.commit()

        return dict(page='dashboard')
    
    @expose('json')
    def get_avatar_path(self, **kwargs):
        print('========================asdasdasdas')
        user_type = request.environ.get('USER_TYPE')
        user_id = str(request.environ.get('REMOTE_USER'))
        if user_type == 'student':
            student = DBSession.query(Student).filter(Student.id == user_id).first()
            if student:
                print(student.pic)
                return dict(path=student.pic)
        elif user_type == 'tutor':
            tutor = DBSession.query(Tutor).filter(Tutor.id == user_id).first()
            if tutor:
                return dict(path=tutor.pic)
            
    @expose('json')
    def get_user_info(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
        user_id = str(request.environ.get('REMOTE_USER'))
        if user_type == 'student':
            student = DBSession.query(Student).filter(Student.id == user_id).first()
            if student:
                print(student.first_name,student.last_name,student.username,student.email,student.phone_number)
                return dict(fn=student.first_name
                            ,ln=student.last_name
                            ,un=student.username
                            ,em=student.email
                            ,pn=student.phone_number)