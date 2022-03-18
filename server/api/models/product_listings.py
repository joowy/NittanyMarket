from . import db


class Product_Listing(db.Model):
    __tablename__ = "Product_Listing"

    seller_email = db.Column(db.ForeignKey(
        "Sellers.email", onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)
    listing_id = db.Column(db.String, primary_key=True)
    # FK
    category = db.Column(db.ForeignKey("Categories.category_name"))

    title = db.Column(db.String, nullable=False)
    product_name = db.Column(db.String)
    product_description = db.Column(db.Text)
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)

    # relationship
    category_relationship = db.relationship(
        "Categories", foreign_keys=[category])

    def __repr__(self):
        return f"Product_Listing seller_email listing_id {self.seller_email,self.listing_id, self.product_name}"

    def save(self):
        db.session.add(self)
        db.session.commit()
