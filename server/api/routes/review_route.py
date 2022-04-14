from datetime import datetime
from typing import List


from api.models import Categories, Product_Listing, db, Reviews, Ratings
from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy import func


api = Namespace("review", description="review routes")


@api.route("/<seller_email>/<listing_id>")
class GetReview(Resource):
    def get(self, seller_email, listing_id):
        # req_data = request.get_json()
        reviews = (
            db.session.query(Reviews)
            .filter(Reviews.seller_email == seller_email)
            .filter(Reviews.listing_id == listing_id)
            .all()
        )
        # seller_rating = db.session.query(Ratings).filter(Ratings.seller_email==seller_email).filter(Ratings.e)
        out = []
        for i in reviews:
            out.append(i.toDICT())
        return out, 200


@api.route("/")
class Review(Resource):
    def post(self):
        req_data = request.get_json()
