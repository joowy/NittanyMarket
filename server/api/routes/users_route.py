from functools import wraps

import jwt
from api.models import (
    Address,
    Buyers,
    Credit_Cards,
    JWTTokenBlocklist,
    Users,
    Sellers,
    Zipcode_Info,
    db,
)
from flask import request
from flask_restx import Namespace, Resource, fields

from ..config import Config

api = Namespace("Users", description="users information")

error_model = api.model("Error", {"success": fields.Boolean, "msg": fields.String,})


# address model
address_model = api.model(
    "Address",
    {
        "street_num": fields.String,
        "street_name": fields.String,
        "city": fields.String,
        "zipcode": fields.String,
        "state_id": fields.String,
        "country_name": fields.String,
    },
)

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
        "billing_address": fields.Nested(address_model),
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


@api.route("/<email>")
class User(Resource):
    @api.response(model=get_user_model, code=200, description="get user info success")
    @api.response(model=error_model, code=400, description="get user info fail")
    # @token_required
    # def get(self, current_user, email):
    def get(self, email):
        buyer_info = None
        seller_info = None
        try:
            buyer_record = (
                db.session.query(Buyers).filter(Buyers.email == email).first()
            )
            seller_record = (
                # Sellers.query.filter_by(username=email).first()
                db.session.query(Sellers)
                .filter(Sellers.email == email)
                .first()
            )
            if buyer_record:
                # billing address
                buyer_billing_address_record = (
                    db.session.query(Address)
                    .filter(buyer_record.billing_address_id == Address.address_ID)
                    .first()
                )
                buyer_billing_zip_info_record = (
                    db.session.query(Zipcode_Info)
                    .filter(
                        buyer_billing_address_record.zipcode == Zipcode_Info.zipcode
                    )
                    .first()
                )
                billing_address_object = {
                    "street_num": buyer_billing_address_record.street_num,
                    "street_name": buyer_billing_address_record.street_name,
                    "zipcode": buyer_billing_address_record.zipcode,
                    "country_name": buyer_billing_zip_info_record.county_name,
                    "state_id": buyer_billing_zip_info_record.state_id,
                    "city": buyer_billing_zip_info_record.city,
                }
                # home address
                buyer_home_address_record = (
                    db.session.query(Address)
                    .filter(buyer_record.home_address_id == Address.address_ID)
                    .first()
                )
                buyer_home_zip_info_record = (
                    db.session.query(Zipcode_Info)
                    .filter(buyer_home_address_record.zipcode == Zipcode_Info.zipcode)
                    .first()
                )
                home_address_object = {
                    "street_num": buyer_home_address_record.street_num,
                    "street_name": buyer_home_address_record.street_name,
                    "zipcode": buyer_home_address_record.zipcode,
                    "country_name": buyer_home_zip_info_record.county_name,
                    "state_id": buyer_home_zip_info_record.state_id,
                    "city": buyer_home_zip_info_record.city,
                }
                # buyer credit card
                buyer_credit_card_record = (
                    db.session.query(Credit_Cards)
                    .filter(buyer_record.email == Credit_Cards.owner_email)
                    .first()
                )

                last_four = ("****-" * 3) + buyer_credit_card_record.credit_card_num[
                    -4:
                ]
                buyer_info = {
                    "email": buyer_record.email,
                    "first_name": buyer_record.first_name,
                    "last_name": buyer_record.last_name,
                    "gender": buyer_record.gender,
                    "age": buyer_record.age,
                    "home_address": home_address_object,
                    "billing_address": billing_address_object,
                    "credit_card_last_four": last_four,
                }
            if seller_record:
                # print(seller_record.email, seller_record.balance, "damn")

                print(seller_record, dir(seller_record), "tikes")

                seller_info = {
                    "email": "email1tet",
                    "balance": 100,
                }
                print("bro")

            return (
                {"BuyerInfo": buyer_info, "SellerInfo": seller_info,},
                200,
            )

        except Exception as e:
            return {"success": False, "msg": e}, 400

