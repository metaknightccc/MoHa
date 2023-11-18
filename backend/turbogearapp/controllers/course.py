# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject, Course_Class
import transaction
import json
import os
from PIL import Image
import spacy
import base64
from io import BytesIO
import datetime

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

        nlp = spacy.load('en_core_web_sm')
        name=request.json['name'],
        description = request.json.get('description')
        doc = nlp(' '.join([name, type, description]))
        lemmas = ' '.join([token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and not token.text == '\n'])
        new_course = Course(
            name = name,
            tutor_id=tutor_id,
            subject_name=request.json['subject_name'],
            type=request.json['type'],
            price=float(request.json['price']),  # Parse price as a float
            pic=request.json['pic'],  # Add pic
            description = description,
            lemmas = lemmas,
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
    def get_course_info(self, **kwargs):
        course_id = kwargs.get('course_id')
        print(course_id)
        course = DBSession.query(Course).filter_by(id=course_id).first()
        print(request.environ.get('USER_TYPE'))
        print('====GetCourseInfo====')
        try:
            with open(course.pic, 'rb') as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
                #return dict(image=encoded_string)
        except:
            image_file = open('./assets/course_pic/default.png', 'rb')
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        if course:
            return dict(
                id=course.id,
                tutor_id=course.tutor_id,
                name=course.name,
                subject_name=course.subject_name,
                type=course.type,
                price=course.price,
                description=course.description,
                user_type = request.environ.get('USER_TYPE'),
                course_pic = encoded_string,
                
            )
        else:
            return dict(status='failed', message='Course not found')
    
    
    @expose('json')
    def get_course_pic(self, **kwargs):
        #uploadImg=request.params['course_pic']
        #uploadImg=request.json['course_pic']
        print("Full Request Object:", request)
        #uploadImg=request.files['course_pic']
        uploadImg=request
        #uploadImg = request.environ['webob.adhoc_attrs']['files']['course_pic']
        #uploadImg = request.files.get('course_pic')
        
        course_id=request.json['course_id']
        print("uploaded img:",uploadImg)
        #binary_data = base64.b64decode(uploadImg)
        img=Image.open(uploadImg.file)
        #img = Image.open(BytesIO(uploadImg.read()))
        #img = Image.open(BytesIO(binary_data))
        # print(img.size)
        # img.save('../react-app/src/assets/'+uploadImg.filename)
        
        #user_type = request.environ.get('USER_TYPE')
        #course_id = str(request.environ.get('REMOTE_USER'))
        img.save('./assets/course_pic/'+uploadImg.filename)
        path_name='./assets/course_pic/'+uploadImg.filename

        with open(path_name, 'rb') as image_file:
            encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

        #TODO: delete the original pic and save every pic with a unique name

        course = DBSession.query(Course).filter(Course.id == course_id).first()
        if course:
            course.pic = path_name
            transaction.commit()

        return dict(image=encoded_string)
    
    @expose('json')
    def mod_course(self, **kwargs): #todo: Should be able to take None, and use a default pic
        user_type = request.environ.get('USER_TYPE')
        if user_type != 'tutor':
            return dict(status='failed', message='User is not a tutor')
        course_id  = request.json['course_id']
        course = DBSession.query(Course).filter_by(id=course_id).first()
        print(course)
        course.name = request.json['course_name']
        #course.subject_name = request.json['subject_name']
        course.type = request.json['course_type']
        course.price = float(request.json['course_price'])
        course.description = request.json.get('course_description')
        print(course)
        print('====Mod course====')
        transaction.commit()
        return dict(page='dashboard', message='successfully modded course!')
    
    
    @expose('json')
    def enroll_course(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
        if user_type == 'tutor':
            return dict(status='failed', message='User is a tutor, cannot enroll')
        student_id=request.environ.get('REMOTE_USER')
        course_id=request.json['course_id']
        print("getting Course Info:")
        cc= DBSession.query(Course_Class).filter_by(course_id=course_id, student_id=student_id).first()
        print("======Enrolling Course=====")
        if not cc:
            new_course_class= Course_Class(
                enroll=True,
                course_id=request.json['course_id'],
                student_id=student_id,
                begin_time=datetime.datetime.now(),
                end_time=datetime.datetime.now(),
                t_begin_time=datetime.datetime.now(),
                t_end_time=datetime.datetime.now(),
                duration=0,
                taken=True,
                price=float(request.json['price']),
                quant_rating=0,
                review="",
            )
            DBSession.add(new_course_class)
            transaction.commit()
            return dict(status='success', message='successfully enrolled course!')
        else:
            return dict(status='failed', message='already enrolled course!')