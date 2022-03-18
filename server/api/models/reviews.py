from . import db 


class Reviews(db.Model):
    __tablename__ = "Reviews"

    buyer_email = db.Column(db.ForeignKey("Buyers.email"), primary_key=True)
    seller_email = db.Column(
        db.ForeignKey("Product_Listing.seller_email"), primary_key=True
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
