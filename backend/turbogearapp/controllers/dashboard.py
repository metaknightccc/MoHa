# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject, Course_Class
import transaction
import json
import os
from PIL import Image
import base64
from datetime import datetime
#import './controllers/course.py'
class DashboardController(TGController):
    '''
    @expose('json')
    def get_existing_subjects(self):
        existing_subjects = DBSession.query(Subject).all()
        subjects = [{'subject_name': subject.subject_name, 'major': subject.major, 'academic': subject.academic} for subject in existing_subjects]
        return json.dumps(subjects).encode('utf-8')
    '''
    @expose('json')
    def index(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
        return dict(status='200', page='dashboard', user_type=user_type)

    @expose('json')
    def course(self, **kwargs):
        return dict(page='course')

    @expose('json')
    def security(self, **kwargs):
        return dict(page='security')
    '''
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
    '''
    @expose('json')
    def update_course_price(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
        if user_type != 'tutor' and request.environ.get('REMOTE_USER') != request.json['tutor_id']:
            return dict(status='failed', message='User is not a tutor/user is not the owner of the course')

        course_id = request.json['course_id']
        
        #new_price = request.json['new_price']
        total_price = 0.0
        course_classes = DBSession.query(Course_Class).filter_by(course_id=course_id).all()
        if course_classes:
            for cc in course_classes:
                total_price += cc.price
            course = DBSession.query(Course).filter_by(id=course_id).first()
            course.price = total_price
            print('=====Updating course price=====')
            transaction.commit()
            return dict(status='success')
        else:
            return dict(status='failed', message='Course not found')
    
    
    @expose('json')
    def upload_image(self, **kwargs):
        print("uploading image.....")
        uploadImg=request.params['user_pic']
        # print(uploadImg)
        img=Image.open(uploadImg.file)
        # print(img.size)
        # img.save('../react-app/src/assets/'+uploadImg.filename)
        
        user_type = request.environ.get('USER_TYPE')
        user_id = request.environ.get('REMOTE_USER')
        original_file_name, original_file_extension = os.path.splitext(uploadImg.filename)
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        file_name = f'{user_type}_{user_id}{original_file_extension}'
        # file_name = f'userIMG_usertype={user_type}_id={user_id}{original_file_extension}'
            # Save the image with the course_id as the filename
        img = Image.open(uploadImg.file)
        img.save(f'./turbogearapp/public/assets/user_pic/{file_name}')

        path_name = f'./turbogearapp/public/assets/user_pic/{file_name}'
        save_path_name = f'/assets/user_pic/{file_name}'
        

        with open(path_name, 'rb') as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

        if user_type == 'student':
            student = DBSession.query(Student).filter(Student.id == user_id).first()
            if student:
                # os.remove("./turbogearapp/public" + student.pic)
                student.pic = save_path_name
                transaction.commit()
        else:
            tutor = DBSession.query(Tutor).filter(Tutor.id == user_id).first()
            if tutor:
                # os.remove("./turbogearapp/public" + tutor.pic)
                tutor.pic = save_path_name
                transaction.commit()

        return dict(image=encoded_string)
    
    @expose('json')
    def get_avatar(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
        user_id = str(request.environ.get('REMOTE_USER'))
        if user_type == 'student':
            student = DBSession.query(Student).filter(Student.id == user_id).first()
            if student:
                #with open("/turbogearapp/public" + student.pic, 'rb') as image_file:
                with open('./turbogearapp/public' + student.pic, 'rb') as image_file:
                    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                return dict(image=encoded_string)
        else:
            tutor = DBSession.query(Tutor).filter(Tutor.id == user_id).first()
            if tutor:
                #with open("/turbogearapp/public" + tutor.pic, 'rb') as image_file:
                with open('./turbogearapp/public' + tutor.pic, 'rb') as image_file:
                    encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                return dict(image=encoded_string)

            
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
        else:
            tutor = DBSession.query(Tutor).filter(Tutor.id == user_id).first()
            if tutor:
                print(tutor.first_name,tutor.last_name,tutor.username,tutor.email,tutor.phone_number)
                return dict(fn=tutor.first_name
                            ,ln=tutor.last_name
                            ,un=tutor.username
                            ,em=tutor.email
                            ,pn=tutor.phone_number)
            
    @expose('json')
    def update_user_info(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
        user_id = str(request.environ.get('REMOTE_USER'))
        print("sadasd=====")
        body_str = request.body.decode('utf-8')
        body_dict = json.loads(body_str)
        edit_first = body_dict['firstname'] 
        edit_last = body_dict['lastname']
        # print(edit_first,edit_last)
        if user_type == 'student':
            student = DBSession.query(Student).filter(Student.id == user_id).first()
            if student:
                student.first_name = edit_first
                student.last_name = edit_last
                transaction.commit()
                return dict(status='success')
        else:
            tutor = DBSession.query(Tutor).filter(Tutor.id == user_id).first()
            if tutor:
                tutor.first_name = edit_first
                tutor.last_name = edit_last
                transaction.commit()
                return dict(status='success')    
        
            
    @expose('json')
    def get_user_courses(self, **kwargs):
        print("========get_user_courses=========")
        user_type = request.environ.get('USER_TYPE')
        user_id = request.environ.get('REMOTE_USER')
        courses = []
        if user_type == 'student':
            enrolled_classes = DBSession.query(Course_Class).filter(Course_Class.student_id == user_id, Course_Class.enroll == True).all()
       
            #courses = []
            for course_class in enrolled_classes:
                course = DBSession.query(Course).filter_by(id=course_class.course_id).first()
                if course:
                    temp = course.tutor_id
                    tutor = DBSession.query(Tutor).filter_by(id=temp).first()
                    courses.append([course.id, course.tutor_id, course.name, course.subject_name, course.type, course.price, course.description, course.pic, tutor.first_name+' '+tutor.last_name])
        else:
            mycourses = DBSession.query(Course).filter(Course.tutor_id == user_id).all()
            #courses = []
            for mycourse in mycourses:
                course = DBSession.query(Course).filter_by(id=mycourse.id).first()
                if course:
                    temp = course.tutor_id
                    tutor = DBSession.query(Tutor).filter_by(id=temp).first()
                    courses.append([course.id, course.tutor_id, course.name, course.subject_name, course.type, course.price, course.description, course.pic, tutor.first_name+' '+tutor.last_name])        # print("======================")
        # print(courses)
        # print("======================")

        return dict(status='success', courses=courses)

    @expose('json')
    def change_password(self, **kwargs):
        print("========change_password=========")
        old_password = request.json['old_password']
        new_password = request.json['new_password']
        confirm_password = request.json['confirm_new_password']
        print(old_password, new_password, confirm_password)
        if new_password != confirm_password:
            print("xxxxxxxxxxxxxxx")
            return dict(status='success', reason='New password and confirm password do not match')
        

        user_type = request.environ.get('USER_TYPE')
        user_id = request.environ.get('REMOTE_USER')
        if user_type == 'student':
            student = DBSession.query(Student).filter(Student.id == user_id).first()

            if student:
                if not student.validate_password(old_password):
                    return dict(status='success', reason='Incorrect old password')
                student._set_password(new_password)
                transaction.commit()
                return dict(status='success', reason='Password changed successfully!')
        else:
            tutor = DBSession.query(Tutor).filter(Tutor.id == user_id).first()
            if tutor:
                if not tutor.validate_password(old_password):
                    return dict(status='success', reason='Incorrect old password')
                tutor._set_password(new_password)
                transaction.commit()
                return dict(status='success')
        return dict(status='success', reason='Password changed successfully!')