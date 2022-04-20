from api.models import Orders, Reviews, db
from flask import request
from flask_restx import Namespace, Resource


api = Namespace("review", description="review routes")


@api.route("/<seller_email>/<listing_id>")
class ReviewRoute(Resource):
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

        reviews_list = []
        for i in reviews:
            revs = i.toDICT()
            reviews_list.append(revs)

        out = dict()
        out.update({"reviews": reviews_list, "can_review": can_review})
        return out, 200

    def post(self, seller_email, listing_id):
        req_data = request.get_json()
        _review_desc = req_data.get("review_desc")
        _buyer_email = req_data.get("buyer_email")
        try:
            newReview = Reviews(
                buyer_email=_buyer_email,
                seller_email=seller_email,
                listing_id=listing_id,
                review_desc=_review_desc,
            )
            newReview.save()
            return {"success": True, "msg": "Review created"}, 200
        except:
            return {"success": False, "msg": "Review not created"}, 400

