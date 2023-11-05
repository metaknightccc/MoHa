import jwt  # Use the same JWT library as in your middleware
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
import datetime

class LoginController(TGController):
    SECRET_KEY = 'your-secret-key'

    @expose('json')
    def index(self, **kwargs):
        isStudent = False
        username = request.json['username']
        password = request.json['password']
        
        user = DBSession.query(Tutor).filter_by(username=username).first()
        if user is None:
            user = DBSession.query(Student).filter_by(username=username).first()
            isStudent = True
        
        if user and user.validate_password(password):
            # Set expiration time for the token, for example, 1 hour from now
            expiration_time = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
            payload = {
                'sub': user.id,
                'name': user.username,
                'user_type': ("student" if isStudent else "tutor"),
                'exp': expiration_time
            }
            token = jwt.encode(payload, self.SECRET_KEY, algorithm='HS256')
            response.status_code = 200
            return dict(token=token, status='success')

        response.status_code = 400 
        return dict(status='failed')
