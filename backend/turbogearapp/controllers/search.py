# controllers/search.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Course, Tutor
import transaction
import json


def sqlalchemy_to_json(sqlalchemy_objects):
    result = []
    for obj in sqlalchemy_objects:
        result.append(
            {column.name: getattr(obj, column.name) for column in obj.__table__.columns}
        )
    return result


class SearchController(TGController):
    @expose("json")
    def index(self, **kwargs):
        print("========================")
        # if no query provided at all
        if not kwargs:
            session = DBSession()
            matching_courses = session.query(Course).limit(5).all()
        else:
            query = kwargs.get('query', '')
            priority = kwargs.get('priority', 'rel')
            subject_name, tutor_name, type = query.split('+')

            session = DBSession()
            
            tutor_id = session.query(Tutor).filter(Tutor.first_name == tutor_name).first()
            matching_courses = session.query(Course).filter(
                Course.Subject_name == subject_name,
                Course.tutor_id == tutor_id,
                Course.type == type,
            ).all()
        
        print("========================")
        for row in matching_courses:
            print(row.name + "\n")
        response = json.dumps(sqlalchemy_to_json(matching_courses))
        return response
