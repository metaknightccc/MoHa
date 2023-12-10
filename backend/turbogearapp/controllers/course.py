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
from sqlalchemy.orm import aliased

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
        subject_name=request.json['subject_name']
        zoom_id=request.json['zoom_id']
        doc = nlp(' '.join([name, type, subject_name, description]))
        lemmas = ' '.join([token.lemma_.lower() for token in doc if not token.is_stop and not token.is_punct and not token.text == '\n'])
        new_course = Course(
            name = name,
            tutor_id=tutor_id,
            subject_name=subject_name,
            type=type,
            price=float(request.json['price']),  # Parse price as a float
            #pic=request.json['pic'],  # Add pic
            description = description,
            lemmas = lemmas,
            zoom_id = zoom_id,
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
        #DBSession.refresh(new_course)
        # print("new Course id: ", new_course.id)
        return dict(page='dashboard#course',message='successfully added course!' )
    

    
    @expose('json')
    def get_course_info(self, **kwargs):
        is_enrolled=False
        course_id = kwargs.get('course_id')
        student_id = request.environ.get('REMOTE_USER')
        user_type = request.environ.get('USER_TYPE')
        is_student = False
        
        if user_type=='student':
            is_student=True
            print("====GetCourseInfo: is student====")
            
        print(course_id)
        course = DBSession.query(Course).filter_by(id=course_id).first()
        enrolled = DBSession.query(Course_Class).filter_by(course_id=course_id, student_id=student_id).first()
        if enrolled:
            is_enrolled = True
            print("====GetCourseInfo: is enrolled====")

        #print("getting course info: usertype:",request.environ.get('USER_TYPE'))
        print('====GetCourseInfo====')
        # try:
        #     with open("./turbogearapp/public" + course.pic, 'rb') as image_file:
        #         encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        #         #return dict(image=encoded_string)
        # except:
        #     image_file = open('./turbogearapp/public/assets/default.png', 'rb')
        #     encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        if course:
            tutor = DBSession.query(Tutor).filter_by(id=course.tutor_id).first()
            print("====GetCourseInfo2====")
            print(is_enrolled)
            return dict(
                id=course.id,
                tutor_id=course.tutor_id,
                tutor_name=str(tutor.first_name) + ' ' + str(tutor.last_name),
                tutor_email=tutor.email,
                name=course.name,
                subject_name=course.subject_name,
                type=course.type,
                price=course.price,
                description=course.description,
                user_type = user_type,
                course_pic = course.pic,
                is_enrolled = is_enrolled,
                user_id=request.environ.get('REMOTE_USER'),
                is_student = is_student,
                zoom_id = course.zoom_id,
                #user_type=request.environ.get('USER_TYPE'),
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
            with open('.turbogearapp/public' + path_name, 'rb') as image_file:
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
        course.zoom_id = request.json['zoom_id']
        
        print("Course Zoom Link: ",course.zoom_id)
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
        print("======Enrolling Course=====")
        print("course_id=",course_id)
        print("getting Course Info:")
        cc= DBSession.query(Course_Class).filter_by(course_id=course_id, 
                                                student_id=student_id).first()
        print("======Enrolling Course=====")
        if not cc:
            new_course_class= Course_Class(
                enroll=True,
                course_id=course_id,
                student_id=student_id,
                begin_time=datetime.datetime.now(),
                end_time=datetime.datetime.now(),
                t_begin_time=datetime.datetime.now(),
                t_end_time=datetime.datetime.now(),
                duration=0,
                taken=True,
                price=float(request.json['course_price']),
                quant_rating=0,
                review="",
                # confirmed=True,
            )
            DBSession.add(new_course_class)
            transaction.commit()
            return dict(status='success', message='successfully enrolled course!')
        else:
            return dict(status='failed', message='already enrolled course!')
        
    @expose('json')
    def get_course_class(self, **kwargs):
        #course_id=request.json['course_id']
        course_id = request.params.get('course_id')
        print("======Getting Course Class=====")
        user_id=request.environ.get('REMOTE_USER')
        user_type = request.environ.get('USER_TYPE')
        ccs=[]
        if user_type == 'tutor':
            allccs=DBSession.query(Course_Class).filter_by(tutor_id=user_id, course_id=course_id,).all() #todo: confirmed = true, tutor should accept the class to teach
            for cc in allccs:
                if not cc.enroll:
                    ccs.append([cc.begin_time, cc.end_time, cc.t_begin_time, cc.t_end_time, cc.duration, cc.normal, cc.side_note, cc.taken, cc.price, cc.quant_rating, cc.review])
            
        elif user_type == 'student':
            allccs=DBSession.query(Course_Class).filter_by(student_id=user_id, course_id=course_id).all()
            for cc in allccs:
                if not cc.enroll:
                    ccs.append([cc.begin_time, cc.end_time, cc.t_begin_time, cc.t_end_time, cc.duration, cc.normal, cc.side_note, cc.taken, cc.price, cc.quant_rating, cc.review])
        else:
            print("======Getting Course Class failed=====")
            print("user_type=",user_type)
            print("user_id=",user_id)
            print("course_id=",course_id)
            return dict(status='failed', message='User is not a tutor or student')
        print("======Getting Course Class=====")
        # for c in ccs:
        #     print(c.begin_time,c.end_time,c.t_begin_time,c.t_end_time,c.duration,c.normal,c.side_note,c.taken,c.price,c.quant_rating,c.review)
        return dict(status='success', message='successfully get course class!', course_class=ccs)
    
    @expose('json')
    def add_course_class(self, **kwargs):
        user_id=request.environ.get('REMOTE_USER')
        course_id=request.json['course_id']
        student_id=request.environ.get('REMOTE_USER')
        
        return dict(status='success', message='successfully added course class!')

    @expose('json')
    def rating_class(self, **kwargs):
        
        # course_id=request.json['course_id']
        student_id=request.environ.get('REMOTE_USER')
        rating=request.json['rating']
        review=request.json['review']
        begin_time=request.json['begin_time']
        end_time=request.json['end_time']
        course_id=request.json['course_id']
        
        cc = DBSession.query(Course_Class).filter(
            course_id == course_id, 
            student_id == student_id,
            begin_time == begin_time,
            end_time == end_time).first()

        # Check if the entry exists
        if cc:
            # Update the rating and review
            cc.quant_rating = rating
            cc.review = review
            transaction.commit()
            return dict(status='success', message='successfully added course rating!')
    
    # @expose('json')
    # def cal_avg_rating(self):
    #     courses = DBSession.query(Course).all()
    #     #courses.expunge_all()
    #     #courses.close()
    #     for course in courses:
    #         related_classes = DBSession.query(Course_Class).filter_by(course_id=course.id).all()
    #         if related_classes:
    #             total_rating = sum([course_class.quant_rating for course_class in related_classes])
    #             avg_rating = total_rating / len(related_classes)
    #             course.avg_rating = avg_rating
    #             transaction.commit()
    #         else:
    #             course.avg_rating = None
    #             transaction.commit()
    #     return dict(status='success', message='successfully calculated average rating!')
    @expose('json')
    def cal_avg_rating(self):
        courses = DBSession.query(Course).all()
        
        for course in courses:
            # Use aliased to create a separate alias for Course_Class
            CourseClassAlias = aliased(Course_Class)

            # Fetch related classes using the aliased class
            related_classes = DBSession.query(CourseClassAlias).filter_by(course_id=course.id).all()

            if related_classes:
                # Calculate the total rating using a list comprehension
                total_rating = sum([course_class.quant_rating for course_class in related_classes])

                # Calculate the average rating
                avg_rating = total_rating / len(related_classes)
                avg_rating = round(avg_rating, 2)
                # Update the course's avg_rating
                #course.avg_rating = avg_rating

            else:
                # No related classes, set avg_rating to None
                avg_rating = None

            # Commit the changes for each course
            course = DBSession.query(Course).filter_by(id=course.id).first()
            course.avg_rating = avg_rating
            #DBSession.commit()

        return dict(status='success', message='successfully calculated average rating!')