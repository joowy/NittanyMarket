from . import db

from sqlalchemy_serializer import SerializerMixin


class Product_Listing(db.Model, SerializerMixin):
    __tablename__ = "Product_Listing"

    seller_email = db.Column(
        db.ForeignKey("Sellers.email", onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True,
    )
    listing_id = db.Column(db.String, primary_key=True)
    # FK
    category = db.Column(db.ForeignKey("Categories.category_name"))

    title = db.Column(db.String, nullable=False)
    product_name = db.Column(db.String)
    product_description = db.Column(db.Text)
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)

    product_active_start = db.Column(db.DateTime)
    product_active_end = db.Column(db.DateTime)

    # relationship
    category_relationship = db.relationship("Categories", foreign_keys=[category])

    def __repr__(self):
        return f"Product_Listing seller_email listing_id {self.seller_email,self.listing_id, self.product_name}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):

        cls_dict = {}
        cls_dict["seller_email"] = self.seller_email
        cls_dict["listing_id"] = self.listing_id
        cls_dict["category"] = self.category
        cls_dict["title"] = self.title
        cls_dict["product_name"] = self.product_name
        cls_dict["product_description"] = self.product_description
        cls_dict["price"] = self.price
        cls_dict["quantity"] = self.quantity
        cls_dict["product_active_start"] = self.product_active_start
        cls_dict["product_active_end"] = self.product_active_end

        return cls_dict
