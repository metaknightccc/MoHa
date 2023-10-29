from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
from tg.exceptions import HTTPFound
import transaction


class LoginController(TGController):
    @expose('json')
    def login(self, **kwargs):
        print('========================')
        #print(request.json)
        email = request.json.get('email')
        password = request.json.get('password')
        user = DBSession.query(Tutor).filter_by(email=email).first() or DBSession.query(Student).filter_by(email=email).first()
        if user and user.validate_password(password):
            # Authentication successful; you can set a session or return a token here
            return HTTPFound(location= '/register')

        # Authentication failed
        return {'message': 'Login failed'}