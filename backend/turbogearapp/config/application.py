# -*- coding: utf-8 -*-
"""WSGI application initialization for turbogear-app."""
from turbogearapp.config.app_cfg import base_config

__all__ = ['make_app']

import jwt
from tg import request
from webob import exc

SECRET_KEY = "your-secret-key"  # use your secret key here
ROUTE_TO_AUTHENTICATE = [
    '/dashboard',
    '/course/add_course',
    '/course/mod_course',
]

def jwt_middleware(app):
    def middleware(environ, start_response):
        auth_header = environ.get('HTTP_AUTHORIZATION', '')
        request_path = environ.get('PATH_INFO', '')
        print('Authorization header:', auth_header)  # add this line to print the header
        print('Request path:', request_path)  # add this line to print the request path

        # # check if the request path is in the list of routes that require authentication
        if not any(request_path.startswith(auth_path) for auth_path in ROUTE_TO_AUTHENTICATE):
            return app(environ, start_response)
        
        # extract the token from the authorization header
        token = environ.get('HTTP_AUTHORIZATION', '').split(' ')[1] if 'HTTP_AUTHORIZATION' in environ else None
        if token is None:
            print('No token found')
            return exc.HTTPUnauthorized('No Token Found')(environ, start_response)

        # decode the token and set the user identity in the request context
        try:
            print('Decoding token:', token)
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
            print('Payload:', payload)
            user_type = payload.get('user_type')  # assuming the payload includes a 'user_type' field
            print('User type:', user_type)
            if user_type not in ['student', 'tutor']:
                return exc.HTTPUnauthorized('Invalid user type')(environ, start_response)
            environ['REMOTE_USER'] = payload['sub']
            environ['USER_TYPE'] = user_type  # additional environment variable to store the user type
            print('User id:', environ['REMOTE_USER'])
            print('User type:', environ['USER_TYPE'])
        except jwt.ExpiredSignatureError:
            return exc.HTTPUnauthorized('Token is expired')(environ, start_response)
        except jwt.InvalidTokenError:
            return exc.HTTPUnauthorized('Invalid token')(environ, start_response)

        return app(environ, start_response)
    return middleware

def make_app(global_conf, **app_conf):
    """
    Set turbogear-app up with the settings found in the PasteDeploy configuration
    file used.

    :param dict global_conf: The global settings for turbogear-app
                             (those defined under the ``[DEFAULT]`` section).

    :return: The turbogear-app application with all the relevant middleware
        loaded.

    This is the PasteDeploy factory for the turbogear-app application.

    ``app_conf`` contains all the application-specific settings (those defined
    under ``[app:main]``.
    """
    app = base_config.make_wsgi_app(global_conf, app_conf, wrap_app=None)

    # Wrap your final TurboGears 2 application with custom middleware here
    app = jwt_middleware(app)

    return app
