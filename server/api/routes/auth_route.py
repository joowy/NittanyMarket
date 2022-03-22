from datetime import datetime, timezone, timedelta
from functools import wraps
from tokenize import String
from flask import request, Blueprint

from flask_restx import Api, Resource, fields, Namespace
from api.models import Users, Buyers, JWTTokenBlocklist, db
import jwt


from ..config import Config

api = Namespace("Auth", description="Authentication for users")

"""
    Flask-Restx models for api request and response data
"""

signup_model = api.model(
    "SignUpModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=120),
        "password": fields.String(required=True, min_length=4, max_length=16),
        "first_name": fields.String(required=True, min_length=1, max_length=16),
        "last_name": fields.String,
        "gender": fields.String,
        "age": fields.Integer(min=0),
    },
)

login_model = api.model(
    "LoginModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=120),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)

user_edit_model = api.model(
    "UserEditModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=120),
        "password": fields.String(required=True, min_length=4, max_length=16),
        "first_name": fields.String(required=True, min_length=1, max_length=16),
        "last_name": fields.String,
        "gender": fields.String,
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
            data = jwt.decode(token, Config.SECRET_KEY, algorithms=["HS256"])
            current_user = Users.get_by_email(data["email"])

            if not current_user:
                return (
                    {
                        "success": False,
                        "msg": "Sorry. Wrong auth token. This user does not exist.",
                    },
                    400,
                )

            token_expired = (
                db.session.query(JWTTokenBlocklist.id)
                .filter_by(jwt_token=token)
                .scalar()
            )

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


@api.route("/register")
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        _first_name = req_data.get("first_name")
        _last_name = req_data.get("last_name")
        _gender = req_data.get("gender")
        _age = int(req_data.get("age"))

        user_exists = Users.get_by_email(_email)
        if user_exists:
            return {"success": False, "msg": f"{_email} is already in use"}, 400

        new_user = Users(email=_email,)

        # hashed password
        new_user.set_password(_password)
        new_user.save()

        # create buyer record
        db.session.execute(
            db.insert(
                Buyers,
                values=[_email, _first_name, _last_name, _gender, _age,],
                # handle table heirachy
                prefixes=["OR IGNORE"],
            )
        )
        db.session.commit()

        return (
            {
                "success": True,
                "email": new_user.email,
                "msg": "The user-buyer was successfully registered",
            },
            200,
        )


@api.route("/login")
class Login(Resource):
    """
       Login user by taking 'login_model' input and return JWT token
    """

    @api.expect(login_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")

        user_exists = Users.get_by_email(_email)

        if not user_exists:
            return {"success": False, "msg": "This email does not exist."}, 400

        if not user_exists.check_password(_password):
            return {"success": False, "msg": "Wrong credentials."}, 400

        # create access token using JWT
        token = jwt.encode(
            {"email": _email, "exp": datetime.utcnow() + timedelta(minutes=30)},
            Config.SECRET_KEY,
        )

        user_exists.set_jwt_auth_active(True)
        user_exists.save()

        return {"success": True, "token": token, "user": user_exists.toJSON()}, 200


@api.route("/edit")
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @api.expect(user_edit_model)
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


@api.route("/logout")
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    @token_required
    def post(self, current_user):

        _jwt_token = request.headers["authorization"]
        jwt_block = JWTTokenBlocklist(
            jwt_token=_jwt_token, created_at=datetime.now(timezone.utc)
        )
        jwt_block.save()

        self.set_jwt_auth_active(False)
        self.save()

        return {"success": True}, 200
