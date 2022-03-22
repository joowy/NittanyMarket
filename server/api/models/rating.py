from . import db


class Ratings(db.Model):
    __tablename__ = "Ratings"

    buyer_email = db.Column(
        db.ForeignKey("Buyers.email", onupdate="CASCADE"), primary_key=True
    )
    seller_email = db.Column(
        db.ForeignKey("Sellers.email", onupdate="CASCADE"), primary_key=True
    )
    date = db.Column(db.DateTime, primary_key=True)
    rating = db.Column(db.Float)
    rating_desc = db.Column(db.Text)

    def __repr__(self):
        return f"buyer_email seller_emailrating {self.buyer_email , self.seller_email , self.rating }"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):

        cls_dict = {}
        cls_dict["buyer_email"] = self.buyer_email
        cls_dict["seller_email"] = self.seller_email
        cls_dict["date"] = self.date
        cls_dict["rating"] = self.rating
        cls_dict["rating_desc"] = self.rating_desc
        return cls_dict
