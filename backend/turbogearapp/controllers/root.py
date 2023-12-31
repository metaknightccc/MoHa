# -*- coding: utf-8 -*-
"""Main Controller"""

from tg import expose, flash, require, url, lurl, TGController
from tg import request, redirect, tmpl_context, response
from tg.i18n import ugettext as _, lazy_ugettext as l_
from tg.exceptions import HTTPFound
from tg import predicates
from turbogearapp import model
from turbogearapp.controllers.secure import SecureController
from turbogearapp.model import DBSession
from tgext.admin.tgadminconfig import BootstrapTGAdminConfig as TGAdminConfig
from tgext.admin.controller import AdminController

from turbogearapp.lib.base import BaseController
from turbogearapp.controllers.error import ErrorController

from turbogearapp.controllers.tutor import TutorController
from turbogearapp.controllers.registration import RegistrationController
from turbogearapp.controllers.search import SearchController
from turbogearapp.controllers.login import LoginController

from turbogearapp.controllers.dashboard import DashboardController

from turbogearapp.controllers.course import CourseController
from turbogearapp.controllers.course_class import ClassController


__all__ = ['RootController']


class RootController(BaseController):
    """
    The root controller for the turbogear-app application.

    All the other controllers and WSGI applications should be mounted on this
    controller. For example::

        panel = ControlPanelController()
        another_app = AnotherWSGIApplication()

    Keep in mind that WSGI applications shouldn't be mounted directly: They
    must be wrapped around with :class:`tg.controllers.WSGIAppController`.

    """
    secc = SecureController()
    admin = AdminController(model, DBSession, config_type=TGAdminConfig)

    error = ErrorController()
    tutor = TutorController()
    reg = RegistrationController()
    search = SearchController()
    login = LoginController()

    dashboard = DashboardController()
    course = CourseController()
    course_class = ClassController()

    def _before(self, *args, **kw):
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, DELETE, PUT, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token'
        response.headers['Access-Control-Max-Age'] = '1728000'
        #print("request: {resquest} \n response: {response}".format(request=request.json, response=response.json))
        tmpl_context.project_name = "turbogearapp"

    @expose('turbogearapp.templates.index')
    def index(self):
        """Handle the front-page."""
        return dict(page='index')
    @expose('turbogearapp.templates.about')
    def about(self):
        """Handle the 'about' page."""
        return dict(page='about')

    @expose('turbogearapp.templates.environ')
    def environ(self):
        """This method showcases TG's access to the wsgi environment."""
        return dict(page='environ', environment=request.environ)

    @expose('turbogearapp.templates.data')
    @expose('json')
    def data(self, **kw):
        """
        This method showcases how you can use the same controller
        for a data page and a display page.
        """
        return dict(page='data', params=kw)
    @expose('turbogearapp.templates.index')
    @require(predicates.has_permission('manage', msg=l_('Only for managers')))
    def manage_permission_only(self, **kw):
        """Illustrate how a page for managers only works."""
        return dict(page='managers stuff')

    @expose('turbogearapp.templates.index')
    @require(predicates.is_user('editor', msg=l_('Only for the editor')))
    def editor_user_only(self, **kw):
        """Illustrate how a page exclusive for the editor works."""
        return dict(page='editor stuff')
    '''
    #@expose('turbogearapp.templates.login')
    @expose('json')
    def login(self, came_from=lurl('/'), failure=None, login=''):
    #def login(self, username, password,failure=None):
        """Start the user login."""
        print('========================here im basic login')
        if failure is not None:
            if failure == 'user-not-found':
                flash(_('User not found'), 'error')
            elif failure == 'invalid-password':
                flash(_('Invalid Password'), 'error')

        login_counter = request.environ.get('repoze.who.logins', 0)
        if failure is None and login_counter > 0:
            flash(_('Wrong credentials'), 'warning')

        return dict(page='login', login_counter=str(login_counter),
                    came_from=came_from, login=login)
    '''
    '''
    @expose('json')
    @expose('turbogearapp.templates.login')
    def login(self, came_from=lurl('/'), failure=None, login=''):
        print('========================here')
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
            return dict(status='success')

        # Authentication failed
        response.status_code = 400 
        return dict(status='failed')
    '''
    
    
    @expose()
    def post_login(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on successful
        authentication or redirect her back to the login page if login failed.

        """
        if not request.identity:
            login_counter = request.environ.get('repoze.who.logins', 0) + 1
            redirect('/login',
                     params=dict(came_from=came_from, __logins=login_counter))
        userid = request.identity['repoze.who.userid']
        flash(_('Welcome back, %s!') % userid)

        # Do not use tg.redirect with tg.url as it will add the mountpoint
        # of the application twice.
        return HTTPFound(location=came_from)

    @expose()
    def post_logout(self, came_from=lurl('/')):
        """
        Redirect the user to the initially requested page on logout and say
        goodbye as well.

        """
        flash(_('We hope to see you soon!'))
        return HTTPFound(location=came_from)
    
    def check_auth(self, **kwargs):
        user_type = request.environ.get('USER_TYPE')
        return dict(status='200', page='dashboard', user_type=user_type)
