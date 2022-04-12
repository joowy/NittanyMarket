from datetime import datetime
from typing import List

from api.models import Cart, db, Product_Listing
from flask import request
from flask_restx import Namespace, Resource

api = Namespace("cart", description="cart routes")


@api.route("/", defaults={"user_email": None})
@api.route("/<user_email>")
class CartRoute(Resource):
    def get(self, user_email):
        user_cart_items = (
            db.session.query(Cart)
            .filter(Cart.buyer_email == "abattrick5k@nsu.edu")
            .all()
        )

        print(user_cart_items)
        # Product_Listing.
        return ["s"], 200

    def post(self, user_email):
        req_data = request.get_json()

        _buyer_email = req_data.get("buyer_email")
        _product_listing_email = req_data.get("product_listing_email")
        _product_listing_id = req_data.get("product_listing_id")
        _quantity = req_data.get("quantity")

        new_cart_item = Cart(
            buyer_email=_buyer_email,
            product_listing_email=_product_listing_email,
            product_listing_id=_product_listing_id,
            quantity=_quantity,
        )
        new_cart_item.save()
        return (
            {
                "success": True,
                "msg": f"{_product_listing_email} {_product_listing_id} was successfully added to cart",
            },
            200,
        )

    def delete(self):

        req_data = request.get_json()

        _buyer_email = req_data.get("buyer_email")
        _product_listing_email = req_data.get("product_listing_email")
        _product_listing_id = req_data.get("product_listing_id")

        db.session.query(Cart).filter(Cart.buyer_email == _buyer_email).filter(
            Cart.product_listing_email == _product_listing_email
        ).filter(Cart.product_listing_id == _product_listing_id).delete()
        db.session.commit()

        return (
            {
                "success": True,
                "msg": f"{_product_listing_email} {_product_listing_id} was successfully removed from cart",
            },
            200,
        )

