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

'''
class SearchController(TGController):
    @expose("json")
    def index(self, **kwargs):
        print("========================")
        # if no query provided at all
        #if not kwargs:
        #    session = DBSession()
        #    matching_courses = session.query(Course).limit(5).all()
        #else:
            #query = kwargs.get('query', '')
            #priority = kwargs.get('priority', 'rel')
        #query= request.json['qwery']
        query= request.json.get('str', '')
            #subject_name, tutor_name, type = query.split('+')
        print(query)
        print("above is request")
            #print(tutor_name)
            #print(type)
        session = DBSession()
            
            #tutor_id = session.query(Tutor).filter(Tutor.first_name == query).first()
        matching_courses = session.query(Course).filter(
            Course.Subject_name == query or
            Course.tutor_id == query or
            Course.type == query
            ).all()
        
        print("========================")
        for row in matching_courses:
            print(row.name + "\n")
        response = json.dumps(sqlalchemy_to_json(matching_courses))
        return response
    '''
class SearchController(TGController):
    @expose("json")
    def index(self, str='', **kwargs):
        print("========================")
        # Use the 'str' parameter passed from the GET request
        query = str.split('=')[1]
        print(query)
        print("above is request")
        session = DBSession()

        matching_courses = session.query(Course).filter(
            Course.Subject_name == query or
            Course.tutor_id == query or
            Course.type == query
        ).all()

        print("========================")
        for row in matching_courses:
            print(row.name + "\n")
        response = json.dumps(sqlalchemy_to_json(matching_courses))
        return response