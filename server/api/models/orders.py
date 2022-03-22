from . import db


class Orders(db.Model):
    __tablename__ = "Orders"
    transaction_id = db.Column(db.Integer, primary_key=True)
    seller_email = db.Column(
        db.ForeignKey("Sellers.email", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=False,
    )
    listing_id = db.Column(db.ForeignKey("Product_Listing.listing_id"), nullable=False)
    buyer_email = db.Column(
        db.ForeignKey("Buyers.email", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=False,
    )
    date = db.Column(db.Date)
    quantity = db.Column(db.Integer)
    payment = db.Column(db.Float)
    # FK

    def __repr__(self):
        return f"buyer_email seller_email listing_id {self.buyer_email,self.seller_email, self.listing_id}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):

        cls_dict = {}
        cls_dict["transaction_id"] = self.transaction_id
        cls_dict["seller_email"] = self.seller_email
        cls_dict["listing_id"] = self.listing_id
        cls_dict["buyer_email"] = self.buyer_email
        cls_dict["date"] = self.date
        cls_dict["quantity"] = self.quantity
        cls_dict["payment"] = self.payment
        return cls_dict
