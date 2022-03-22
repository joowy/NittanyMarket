from . import db


class Reviews(db.Model):
    __tablename__ = "Reviews"

    buyer_email = db.Column(
        db.ForeignKey("Buyers.email", onupdate="CASCADE"), primary_key=True
    )
    seller_email = db.Column(
        db.ForeignKey("Product_Listing.seller_email", onupdate="CASCADE"),
        primary_key=True,
    )
    listing_id = db.Column(
        db.ForeignKey("Product_Listing.listing_id"), primary_key=True
    )
    review_desc = db.Column(db.Text)

    def __repr__(self):
        return f"reviews buyer_email seller_email listing_id {self.buyer_email , self.seller_email , self.listing_id }"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):

        cls_dict = {}
        cls_dict["buyer_email"] = self.buyer_email
        cls_dict["seller_email"] = self.seller_email
        cls_dict["listing_id"] = self.listing_id
        cls_dict["review_desc"] = self.review_desc
        return cls_dict
