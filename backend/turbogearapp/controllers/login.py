
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from tg.exceptions import HTTPFound
import transaction


class LoginController(TGController):
    #DBSession.init_model()
    
    @expose('json')
    def index(self, **kwargs):
        print('========================im the new login')
        print(request.json)
        #maker = sessionmaker(autoflush=True, autocommit=False)
        #DBSession = scoped_session(maker)
        #session=DBSession()
        #DBSession = scoped_session(sessionmaker())
        #username = request.json.get('username')
        #password = request.json.get('password')
        username = request.json['username']
        password = request.json['password']
        user = DBSession.query(Tutor).filter_by(username=username).first() or DBSession.query(Student).filter_by(username=username).first()
        #user = DBSession.query(Student).filter_by(username=username).first()
        #print("woshidashabi")
        #print(user.username) 
        if user and user.validate_password(password):
            #response.status_code = 200
            # Authentication successful; you can set a session or return a token here
            #return HTTPFound(location= 'register')
            response.status_code=200
            #return dict(status='success')
            return dict(page='/homepage', message='Success Login')

        # Authentication failed
        response.status_code = 400 
        return dict(status='failed')
'''
from tg import expose, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
from tg.exceptions import HTTPFound, HTTPServerError
import transaction
import json

class LoginController(TGController):
    @expose('json')
    def index(self, **kwargs):
        try:
            username = kwargs.get('username')
            password = kwargs.get('password')

            user = DBSession.query(Tutor).filter_by(username=username).first() or DBSession.query(Student).filter_by(username=username).first()

            if user and user.validate_password(password):
                response.status_code = 200
                return {'status': 'success'}

            response.status_code = 400
            return {'status': 'failed'}

        except Exception as e:
            # Log the error for debugging
            print("Error:", e)
            response.status_code = 500
            return {'status': 'error', 'message': 'Internal server error'}
'''