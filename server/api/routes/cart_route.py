from datetime import datetime
from typing import List

from api.models import Categories, Product_Listing, db
from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy import func

api = Namespace("cart", description="cart routes")


@api.route("/add")
class PlaceOrder(Resource):
    def post(self):
        req_data = request.get_json()

        _seller_email = req_data.get("email")
        _category = req_data.get("product_listing")
        _title = req_data.get("quantity")
        
        print("xd")
        return [], 200

