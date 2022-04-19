from datetime import datetime
from api.models import Ratings, db
from flask import request
from flask_restx import Namespace, Resource


api = Namespace("ratings", description="rating for sellers")


@api.route("/<seller_email>")
class RatingRoute(Resource):
    def post(self, seller_email):

        req_data = request.get_json()
        _buyer_email = req_data.get("buyer_email")
        _rating_desc = req_data.get("rating_desc")
        _rating = req_data.get("rating")

        try:
            newRating = Ratings(
                buyer_email=_buyer_email,
                seller_email=seller_email,
                date=datetime.now(),
                rating=_rating,
                rating_desc=_rating_desc,
            )
            newRating.save()
            return {"success": True, "msg": "Rating created"}, 200
        except:
            return {"success": False, "msg": "Rating not created"}, 400

