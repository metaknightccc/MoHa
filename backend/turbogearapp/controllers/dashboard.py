# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject
import transaction
import json
import os
from PIL import Image

class DashboardController(TGController):
    

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