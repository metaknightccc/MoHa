# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
import transaction


class RegistrationController(TGController):
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
        
        DBSession.add(tutor)
        transaction.commit()
        # return dict(page='login', login_counter=str(login_counter),
        #             came_from=came_from, login=login)
        return dict(page='/login', message='Tutor registration successful.')


    @expose('json')
    def register_student(self, **kwargs):
        print('========================')
        print(request.json)
        # TODO: Hash the password before saving
        student = Student(
            first_name = request.json['first_name'],
            last_name = request.json['last_name'],
            username = request.json['username'],
            _password = request.json['password'],
            email = request.json['email'],
            phone_number = request.json['phone_number']
        )
        DBSession.add(student)
        transaction.commit()
        return dict(page='/login', message='Student registration successful.')

