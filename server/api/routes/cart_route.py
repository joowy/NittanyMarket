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
            db.session.query(Cart, Product_Listing)
            .filter(Cart.product_listing_email == Product_Listing.seller_email)
            .filter(Cart.product_listing_id == Product_Listing.listing_id)
            .filter(Cart.buyer_email == user_email)
            .all()
        )
        records = []
        for i in user_cart_items:
            record = dict()
            record.update(i[1].toDICT())
            record.update(i[0].toDICT())
            records.append(record)
        return records, 200

    def post(self, user_email):
        req_data = request.get_json()

        _buyer_email = req_data.get("buyer_email")
        _product_listing_email = req_data.get("product_listing_email")
        _product_listing_id = req_data.get("product_listing_id")
        _cart_quantity = req_data.get("cart_quantity")

        new_cart_item = Cart(
            buyer_email=_buyer_email,
            product_listing_email=_product_listing_email,
            product_listing_id=_product_listing_id,
            cart_quantity=_cart_quantity,
        )
        new_cart_item.save()
        return (
            {
                "success": True,
                "msg": f"{_product_listing_email} {_product_listing_id} was successfully added to cart",
            },
            200,
        )


@api.route("/delete", defaults={"user_email": None})
class DeleteFromCart(Resource):
    def post(self, user_email):

        req_data = request.get_json()
        print(req_data, request, "??????????//")

        _buyer_email = req_data.get("buyer_email")
        _product_listing_email = req_data.get("product_listing_email")
        _product_listing_id = req_data.get("product_listing_id")
        print("herehrher")
        obj = (
            db.session.query(Cart)
            .filter(Cart.buyer_email == _buyer_email)
            .filter(Cart.product_listing_email == _product_listing_email)
            .filter(Cart.product_listing_id == _product_listing_id)
            .one()
        )

        db.session.delete(obj)
        db.session.commit()

        return (
            {
                "success": True,
                "msg": f"{_product_listing_email} {_product_listing_id} was successfully removed from cart",
            },
            200,
        )
