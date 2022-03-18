
from . import db


class Ratings(db.Model):
    __tablename__ = "Ratings"

    buyer_email = db.Column(db.ForeignKey("Buyers.email"), primary_key=True)
    seller_email = db.Column(db.ForeignKey("Sellers.email"), primary_key=True)
    rating = db.Column(db.Float)
    rating_desc = db.Column(db.Text)

    def __repr__(self):
        return f"buyer_email seller_emailrating {self.buyer_email , self.seller_email , self.rating }"

    def save(self):
        db.session.add(self)
        db.session.commit()
