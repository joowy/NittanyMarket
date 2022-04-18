from datetime import datetime
from typing import List

# TODO: delete this file
from api.models import Categories, Product_Listing, db
from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy import func

api = Namespace("orders", description="order routes")


product_hierarchy_model = api.model(
    "ProductHierarchy", {"category_name": fields.String(required=True),},
)
product_hierarchy_model["parent_category"] = fields.Nested(product_hierarchy_model)
error_model = api.model("Error", {"success": fields.Boolean, "msg": fields.String,})


@api.route("/place")
class PlaceOrder(Resource):
    def post(self):
        req_data = request.get_json()

