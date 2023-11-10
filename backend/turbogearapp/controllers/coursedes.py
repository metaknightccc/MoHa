# controllers/coursedes.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student, Course, Subject
import transaction
import json

class CourseDesController(TGController):
    @expose('json')
    def coursedes(self, **kwargs):
        return dict(page='/coursedes')