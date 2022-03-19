from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from api.models import Buyers, JWTTokenBlocklist, Users, db
from flask import Blueprint, request
from flask_restx import Api, Resource, fields

from ..config import Config
from . import rest_api

"""
    Flask-Restx models for api request and response data
"""

signup_model = rest_api.model(
    "SignUpModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=120),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)

login_model = rest_api.model(
    "LoginModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=120),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)

user_edit_model = rest_api.model(
    "UserEditModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=120),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)


def token_required(f):

    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if "authorization" in request.headers:
            token = request.headers["authorization"]

        if not token:
            return {"success": False, "msg": "Valid JWT token is missing"}, 400

        try:
            data = jwt.decode(token, Config.SECRET_KEY,
                              algorithms=["HS256"])
            current_user = Users.get_by_email(data["email"])

            if not current_user:
                return {"success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist."}, 400

            token_expired = db.session.query(
                JWTTokenBlocklist.id).filter_by(jwt_token=token).scalar()

            if token_expired is not None:
                return {"success": False, "msg": "Token revoked."}, 400

            if not current_user.check_jwt_auth_active():
                return {"success": False, "msg": "Token expired."}, 400

        except:
            return {"success": False, "msg": "Token is invalid"}, 400

        return f(current_user, *args, **kwargs)

    return decorator


"""
    Flask-Restx routes
"""


@rest_api.route("/api/auth/register")
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)
        if user_exists:
            return {"success": False, "msg": f"{_email} is already in use"}, 400

        new_user = Users(
            email=_email,
        )

        # hashed password
        new_user.set_password(_password)
        new_user.save()

        return (
            {
                "success": True,
                "email": new_user.email,
                "msg": "The user was successfully registered",
            },
            200,
        )


@rest_api.route("/api/auth/login", methods=['POST'])
class Login(Resource):
    """
       Login user by taking 'login_model' input and return JWT token
    """

    @rest_api.expect(login_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)

        if not user_exists:

            return {"success": False,
                    "msg": "This email does not exist."}, 400

        if not user_exists.check_password(_password):

            return {"success": False,
                    "msg": "Wrong credentials."}, 400

        # create access token using JWT
        token = jwt.encode({'email': _email, 'exp': datetime.utcnow(
        ) + timedelta(minutes=30)}, Config.SECRET_KEY)

        user_exists.set_jwt_auth_active(True)
        user_exists.save()

        return {"success": True,
                "token": token,
                "user": user_exists.toJSON()}, 200


@rest_api.route('/api/auth/edit')
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @rest_api.expect(user_edit_model)
    @token_required
    def post(self, current_user):

        req_data = request.get_json()

        _new_email = req_data.get("email")
        _new_password = req_data.get("password")

        if _new_password:
            self.update_password(_new_password)

        if _new_email:
            self.update_email(_new_email)

        self.save()

        return {"success": True}, 200


@rest_api.route('/api/auth/logout')
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):

        _jwt_token = request.headers["authorization"]

        jwt_block = JWTTokenBlocklist(
            jwt_token=_jwt_token, created_at=datetime.now(timezone.utc))
        jwt_block.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, 200
