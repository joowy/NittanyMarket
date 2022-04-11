from . import db


class Cart(db.Model):
    __tablename__ = "Cart"

    email = db.Column(
        db.ForeignKey("Buyers.email", onupdate="CASCADE"), primary_key=True
    )
    product_listing_id = db.Column(
        db.ForeignKey("Product_Listing.listing_id", onupdate="CASCADE"),
        primary_key=True,
    )
    quantity = db.Column(db.Integer)

    def __repr__(self):
        return f"cart item  {self.email , self.product_listing_id , self.quantity }"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):
        cls_dict = {}
        cls_dict["email"] = self.email
        cls_dict["product_listing_id"] = self.product_listing_id
        cls_dict["quantity"] = self.quantity

        return cls_dict
