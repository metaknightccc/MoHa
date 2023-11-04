# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject
import transaction



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
    def add_course(self, **kwargs):
        new_course = Course(
            tutor_id = request.json['tutor_id'],
            name = request.json['name'],
            subject_name = request.json['subject_name'],
            type = request.json['type'],
            price = request.json['price']
            )
        coursecheck = DBSession.query(Subject).filter_by(subject_name=new_course.subject_name).first()
        if(coursecheck):
            DBSession.add(new_course)
        else:
            newsub= Subject(
                subject_name = request.json['subject_name'],#todo: do a checkbox on frontend to choose wheter the course exists
                major = request.json['major'],
                academic = request.json['academic']
            )
            DBSession.add(newsub)
            transaction.commit()
            DBSession.add(new_course)
        transaction.commit()
            
                   
        return dict(page='add_course')