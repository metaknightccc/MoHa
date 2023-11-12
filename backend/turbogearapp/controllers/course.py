# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject
import transaction
import json
import os
from PIL import Image
import spacy


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
        if course:
            return dict(
                id=course.id,
                tutor_id=course.tutor_id,
                name=course.name,
                subject_name=course.subject_name,
                type=course.type,
                price=course.price,
                description=course.description
            )
        else:
            return dict(status='failed', message='Course not found')