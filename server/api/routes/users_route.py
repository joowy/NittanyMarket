from datetime import datetime, timezone, timedelta
from functools import wraps
from tokenize import String
from flask import request, Blueprint

from flask_restx import Resource, fields, Namespace, reqparse
from api.models import Users, Buyers, JWTTokenBlocklist, db
import jwt

from api.models import Buyers, Address, Zipcode_Info


from ..config import Config

api = Namespace("Users", description="users information")


parser = reqparse.RequestParser()
# parser.add_argument("sort", type=str, action="split")


# model for getting users.
""" should display information of the personal information, which
 includes name, email ID, age, gender, email address, home and billing address, which
 includes street, city, state and zipcode, last four digits of credit card number."""
get_user_model = api.model(
    "Users",
    {
        "email": fields.String(required=True, min_length=4, max_length=120),
        "first_name": fields.String(required=True, min_length=1, max_length=16),
        "last_name": fields.String,
        "gender": fields.String,
        "age": fields.Integer(min=0),
        "home_address": fields.String,
        "billing_address": fields.String,
        "last_four_credit_card": fields.String,
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


# def row2dict(row):
#     d = {}
#     for column in row.__table__.columns:
#         d[column.name] = str(getattr(row, column.name))

#     return d


@api.route("/<string:email>")
class User(Resource):
    @api.marshal_with(get_user_model)
    def get(self, email):
        _Buyer = Buyers.query.filter_by(email=email).first()

        _home_address = Address.query.filter_by(
            address_ID=_Buyer.home_address_id
        ).first()

        _billing_address = (
            db.session.query(Buyers, Address, Zipcode_Info)
            .join(Address, Address.address_ID == Buyers.home_address_id)
            .join(Zipcode_Info, Zipcode_Info.zipcode == Address.zipcode)
            .filter(Buyers.email == email)
            .all()
        )

        for x in _billing_address:
            print(x._asdict())
        # print(
        #     _billing_address.email,
        #     _billing_address.first_name,
        #     _billing_address.last_name,
        #     _billing_address.gender,
        #     _billing_address.age,
        # )
        return (
            {
                "email": _Buyer.email,
                "first_name": _Buyer.first_name,
                "last_name": _Buyer.last_name,
                "gender": _Buyer.gender,
                "age": _Buyer.age,
                "home_address": _home_address,
                "billing_address": _billing_address,
                "last_four_credit_card": "1",
            },
            200,
        )

