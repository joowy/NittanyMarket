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
        "home_address": fields.Nested(address_model),
        "billing_address": fields.String,
        "last_four_credit_card": fields.String,
    },
)

address_model = api.model("Address",{
"street_num": fields.String,
"street_name":fields.String, 

"zipcode":

})
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

        home_address_record = (
            db.session.query(Buyers, Zipcode_Info, Address)
            .join(Address, Address.address_ID == Buyers.home_address_id)
            .join(Zipcode_Info, Zipcode_Info.zipcode == Address.zipcode)
            .filter(Buyers.email == email)
            .all()
        )[0]
        billing_address_record = (
            db.session.query(Buyers, Zipcode_Info, Address)
            .join(Address, Address.address_ID == Buyers.billing_address_id)
            .join(Zipcode_Info, Zipcode_Info.zipcode == Address.zipcode)
            .filter(Buyers.email == email)
            .all()
        )[0]
        # print(home_address_record._asdict())
        # print(billing_address_record._asdict())
        print(
            home_address_record.Address.street_num,
            home_address_record.Address.street_name,
            home_address_record.Address.zipcode,
        )
        home_address_object = {
            "street_num": home_address_record.Address.street_num,
            "street_name": home_address_record.Address.street_name,
            "zipcode": home_address_record.Address.zipcode,
        }

        return (
            {
                "email": home_address_record.Buyers.email,
                "first_name": home_address_record.Buyers.first_name,
                "last_name": home_address_record.Buyers.last_name,
                "gender": home_address_record.Buyers.gender,
                "age": home_address_record.Buyers.age,
                "home_address": home_address_object,
                "billing_address": "x",
                "last_four_credit_card": "1",
            },
            200,
        )

