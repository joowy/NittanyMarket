from datetime import datetime, timedelta, timezone
from functools import wraps
from tokenize import String

from api.models import Categories
from flask import request
from flask_restx import Namespace, Resource, fields

from ..config import Config

api = Namespace("Products", description="Products related routes")


product_hierarchy_model = api.model(
    "ProductHierarchy", {"category_name": fields.String(required=True),},
)
product_hierarchy_model["parent_category"] = fields.Nested(product_hierarchy_model)
error_model = api.model("Error", {"success": fields.Boolean, "msg": fields.String,})


@api.route("/product_category")
class ProductCategory(Resource):
    @api.response(
        model=product_hierarchy_model,
        code=200,
        description="get product category success",
    )
    @api.response(model=error_model, code=400, description="get product category fail")
    def get(self):
        x = Categories.query.all()
        # cats = {}
        # for i in x:
        #     print(i.children, i.category_name)
        #     # if i.category_name not in cats:
                

        # return {"test": 1}, 200


# @api.route("/register")
# class Register(Resource):
#     """
#        Creates a new user by taking 'signup_model' input
#     """

#     def post(self):

#         req_data = request.get_json()

#         _email = req_data.get("email")
#         _password = req_data.get("password")

#         _first_name = req_data.get("first_name")
#         _last_name = req_data.get("last_name")
#         _gender = req_data.get("gender")
#         _age = int(req_data.get("age"))

#         user_exists = Users.get_by_email(_email)
#         if user_exists:
#             return {"success": False, "msg": f"{_email} is already in use"}, 400

#         new_user = Users(email=_email,)

#         # hashed password
#         new_user.set_password(_password)
#         new_user.save()

#         # create buyer record
#         db.session.execute(
#             db.insert(
#                 Buyers,
#                 values=[_email, _first_name, _last_name, _gender, _age,],
#                 # handle table heirachy
#                 prefixes=["OR IGNORE"],
#             )
#         )
#         db.session.commit()

#         return (
#             {
#                 "success": True,
#                 "email": new_user.email,
#                 "msg": "The user-buyer was successfully registered",
#             },
#             200,
#         )

