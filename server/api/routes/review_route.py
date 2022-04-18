from datetime import datetime
from typing import List


from api.models import Categories, Product_Listing, db, Reviews, Ratings, Orders
from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy import func


api = Namespace("review", description="review routes")


@api.route("/<seller_email>/<listing_id>")
class GetReview(Resource):
    def get(self, seller_email, listing_id):

        user = request.args.get("user")

        reviews = (
            db.session.query(Reviews)
            .filter(Reviews.seller_email == seller_email)
            .filter(Reviews.listing_id == listing_id)
            .all()
        )

        can_review = False
        if user:
            query = (
                db.session.query(Orders)
                .filter(Orders.seller_email == seller_email)
                .filter(Orders.listing_id == listing_id)
                .filter(Orders.buyer_email == user)
                .first()
            )
            if query:
                can_review = True

        # seller_rating = (
        #     db.session.query(Ratings)
        #     .filter(Ratings.seller_email == seller_email)
        #     .filter(Ratings.e)
        # )

        reviews_list = []
        for i in reviews:
            revs = i.toDICT()
            reviews_list.append(revs)
            
        out = dict()
        out.update({"reviews": reviews_list, "can_review": can_review})
        return out, 200


@api.route("/")
class Review(Resource):
    def post(self):
        req_data = request.get_json()
