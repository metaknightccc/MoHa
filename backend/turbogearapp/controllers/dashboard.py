# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
import transaction


class DashboardController(TGController):
    @expose('json')
    def register_tutor(self, **kwargs):
        # TODO: Hash the password and encrypt the SSN before saving
        #done: password would be hashed in database
        print('========================')
        print(request.json)
        tutor = Tutor(
            first_name = request.json['first_name'],
            last_name = request.json['last_name'],
            username = request.json['username'],
            password = request.json['password'],
            email = request.json['email'],
            phone_number = request.json['phone_number'],
            social_security_number = request.json['social_security_number']

        )
