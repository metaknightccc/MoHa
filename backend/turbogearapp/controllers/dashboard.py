# controllers/registration.py
from tg import expose, validate, request, response, TGController
from turbogearapp.model import DBSession, Tutor, Student
import transaction



class DashboardController(TGController):
    @expose('json')
    def index(self, **kwargs):
        return dict(page='profile')
    

    @expose('json')
    def course(self, **kwargs):
        return dict(page='course')
    
    @expose('json')
    def security(self, **kwargs):
        return dict(page='security')
