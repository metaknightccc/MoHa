from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
from tg.exceptions import HTTPFound
import transaction


class LoginController(TGController):
    DBSession.init_model()

    @expose('json')
    def login(self, username, password):
        print('========================')
        print(request.json)
        session=DBSession()
        #DBSession = scoped_session(sessionmaker())
        username = request.json.get('username')
        password = request.json.get('password')
        #user = DBSession.query(Tutor).filter_by(username=self.username).first() or DBSession.query(Student).filter_by(username=self.username).first()
        user = session.query(Student).filter_by(username=username).first()
        print("woshidashabi")
        print(user.username) 
        if user: #and user.validate_password(password):
            response.status_code = 200
            # Authentication successful; you can set a session or return a token here
            #return HTTPFound(location= 'register')
            return response

        # Authentication failed
        response.status_code = 400 
        return response, user.username