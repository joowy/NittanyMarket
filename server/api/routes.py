from flask import request
from flask_restx import Api, Resource, fields


from .models import Users, Buyers


rest_api = Api(version="1.0", title="Users API")


"""
    Flask-Restx models for api request and response data
"""

signup_model = rest_api.model(
    "SignUpModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=64),
        "first_name": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)

login_model = rest_api.model(
    "LoginModel",
    {
        "email": fields.String(required=True, min_length=4, max_length=64),
        "password": fields.String(required=True, min_length=4, max_length=16),
    },
)

user_edit_model = rest_api.model(
    "UserEditModel",
    {
        "userID": fields.String(required=True, min_length=1, max_length=32),
        "username": fields.String(required=True, min_length=2, max_length=32),
        "email": fields.String(required=True, min_length=4, max_length=64),
    },
)


"""
    Flask-Restx routes
"""


@rest_api.route("/api/users/register")
class Register(Resource):
    """
       Creates a new user by taking 'signup_model' input
    """

    @rest_api.expect(signup_model, validate=True)
    def post(self):

        req_data = request.get_json()

        _email = req_data.get("email")
        _password = req_data.get("password")
        _first_name = req_data.get("first_name")
        _age = req_data.get("age")

        _home_address_id = req_data.get("home_address_id")
        _billing_address_id = req_data.get("billing_address_id")
        user_exists = Users.get_by_email(_email)
        if user_exists:
            return {"success": False, "msg": f"Email({_email}) already taken"}, 400

        new_user = Users(
            email=_email,
            first_name=_first_name,
            age=_age,
            home_address_id=_home_address_id,
            billing_address_id=_billing_address_id,
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


@rest_api.route("/api/users/login")
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
            return {"success": False, "msg": "This email does not exist."}, 400

        if not user_exists.check_password(_password):
            return {"success": False, "msg": "Wrong credentials."}, 400

        # create access token uwing JWT

        user_exists.save()

        return {"success": True, "user": user_exists.toJSON()}, 200


@rest_api.route("/api/users/edit")
class EditUser(Resource):
    """
       Edits User's username or password or both using 'user_edit_model' input
    """

    @rest_api.expect(user_edit_model)
    def post(self, current_user):

        req_data = request.get_json()

        _new_username = req_data.get("username")
        _new_email = req_data.get("email")

        if _new_username:
            self.update_username(_new_username)

        if _new_email:
            self.update_email(_new_email)

        self.save()

        return {"success": True}, 200


@rest_api.route("/api/users/logout")
class LogoutUser(Resource):
    """
       Logs out User using 'logout_model' input
    """

    def post(self, current_user):

        return {"success": True}, 200
