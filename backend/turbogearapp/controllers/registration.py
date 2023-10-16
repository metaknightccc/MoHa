# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
import transaction
from formencode import validators

class RegistrationController(TGController):
    @expose('json')
    @validate({
        'first_name': validators.String(not_empty=True),
        'last_name': validators.String(not_empty=True),
        'username': validators.String(not_empty=True),
        'password': validators.String(not_empty=True),
        'email': validators.String(not_empty=True),
        'phone_number': validators.String(),
        'social_security_number': validators.String(not_empty=True)
    })
    def register_tutor(self, **kwargs):
        # TODO: Hash the password and encrypt the SSN before saving
        tutor = Tutor(
            first_name=kwargs.get('first_name'),
            last_name=kwargs.get('last_name'),
            username=kwargs.get('username'),
            password=kwargs.get('password'), 
            email=kwargs.get('email'),
            phone_number=kwargs.get('phone_number'),
            social_security_number=kwargs.get('social_security_number')
        )
        DBSession.add(tutor)
        transaction.commit()
        return {"status": "success", "message": "Tutor registered successfully!"}

    @expose('json')
    @validate({
        'first_name': validators.String(not_empty=True),
        'last_name': validators.String(not_empty=True),
        'username': validators.String(not_empty=True),
        'password': validators.String(not_empty=True)
    })
    def register_student(self, **kwargs):
        # TODO: Hash the password before saving
        student = Student(
            first_name=kwargs.get('first_name'),
            last_name=kwargs.get('last_name'),
            username=kwargs.get('username'),
            password=kwargs.get('password')
        )
        DBSession.add(student)
        transaction.commit()
        return {"status": "success", "message": "Student registered successfully!"}
