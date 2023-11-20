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
        name=request.json['name']
        description = request.json.get('description')
        type=request.json['type']
        doc = nlp(' '.join([name, type, description]))
        lemmas = ' '.join([token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and not token.text == '\n'])
        new_course = Course(
            name = name,
            tutor_id=tutor_id,
            subject_name=request.json['subject_name'],
            type=type,
            price=float(request.json['price']),  # Parse price as a float
            #pic=request.json['pic'],  # Add pic
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
                academic=request.json['academic'],  # Parse academic as a boolean
                
            )
            print(request.json['academic'])
            DBSession.add(newsub)
            transaction.commit()
            DBSession.add(new_course)  
        transaction.commit()
        #DBSession.flush()
        DBSession.refresh(new_course)
        print("new Course id: ", new_course.id)
        return dict(page='dashboard#course',message='successfully added course!' )
    

    
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
            image_file = open('./turbogearapp/public/assets/default.png', 'rb')
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
    
    
    
    
    
    # @expose('json')
    # def get_course_pic(self, **kwargs):
    #     uploadImg=request.params['course_pic']
    #     course_id=int(request.params['course_id'])
    #     # print(uploadImg)
    #     img=Image.open(uploadImg.file)
    #     # print(img.size)
    #     # img.save('../react-app/src/assets/'+uploadImg.filename)
        
    #     user_type = request.environ.get('USER_TYPE')
    #     #user_id = str(request.environ.get('REMOTE_USER'))
    #     img.save('./assets/course_pic/'+uploadImg.filename)
    #     path_name='./assets/course_pic/'+uploadImg.filename

    #     with open(path_name, 'rb') as image_file:
    #         encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

    #     #TODO: delete the original pic and save every pic with a unique name

    #     course = DBSession.query(Course).filter(Course.id == course_id).first()
    #     if course:
    #         course.pic = path_name
    #         transaction.commit()

    #     return dict(image=encoded_string)

    
    @expose('json')
    def get_course_pic(self, **kwargs):
        try:
            uploadImg = request.params.get('course_pic')
            course_id = int(request.params['course_id'])
            user_type = request.environ.get('USER_TYPE')
            #img = Image.open(uploadImg.file)
            original_file_name, original_file_extension = os.path.splitext(uploadImg.filename)
            file_name = f'courseIMG_courseid={course_id}{original_file_extension}'
            # Save the image with the course_id as the filename
            img = Image.open(uploadImg.file)
            img.save(f'./turbogearapp/public/assets/course_pic/{file_name}')

            path_name = f'./turbogearapp/public/assets/course_pic/{file_name}'
            save_path_name = f'/assets/course_pic/{file_name}'
            #for now: no need deletion since it would overwrite the previous img
            # Open the saved image file and encode it to base64
            with open(path_name, 'rb') as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')

            # TODO: delete the original pic (if needed)

            # Update the Course instance with the new file path
            course = DBSession.query(Course).filter(Course.id == course_id).first()
            if course:
                course.pic = save_path_name
                transaction.commit()

            return dict(image=encoded_string, filename=file_name)
        except Exception as e:
            return dict(error=str(e))
    
    
    
    
    
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