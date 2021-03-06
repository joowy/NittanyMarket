from . import db


class Cart(db.Model):
    __tablename__ = "Cart"
    buyer_email = db.Column(
        db.ForeignKey("Buyers.email", onupdate="CASCADE"), primary_key=True,
    )
    product_listing_email = db.Column(
        db.ForeignKey("Product_Listing.seller_email", onupdate="CASCADE"),
        primary_key=True,
    )

    product_listing_id = db.Column(
        db.ForeignKey("Product_Listing.listing_id", onupdate="CASCADE"),
        primary_key=True,
    )
    cart_quantity = db.Column(db.Integer)

    def __repr__(self):
        return f"cart item  {self.product_listing_email , self.product_listing_id , self.cart_quantity }"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):
        cls_dict = {}
        cls_dict["buyer_email"] = self.buyer_email
        cls_dict["product_listing_email"] = self.product_listing_email
        cls_dict["product_listing_id"] = self.product_listing_id
        cls_dict["cart_quantity"] = self.cart_quantity

        return cls_dict
