from . import db


class Orders(db.Model):
    __tablename__ = "Orders"
    transaction_id = db.Column(db.Integer, primary_key=True)
    seller_email = db.Column(db.ForeignKey("Sellers.email"), nullable=False)
    listing_id = db.Column(db.ForeignKey(
        "Product_Listing.listing_id"), nullable=False)
    buyer_email = db.Column(db.ForeignKey("Buyers.email"), nullable=False)
    date = db.Column(db.Date)
    quantity = db.Column(db.Integer)
    payment = db.Column(db.Float)
    # FK

    def __repr__(self):
        return f"buyer_email seller_email listing_id {self.buyer_email,self.seller_email, self.listing_id}"

    def save(self):
        db.session.add(self)
        db.session.commit()
