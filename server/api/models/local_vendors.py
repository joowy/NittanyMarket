from . import db    
from .sellers import Sellers


class Local_Vendors(Sellers):
    __tablename__ = "Local_Vendors"
    email = db.Column(db.ForeignKey(
        "Sellers.email", onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)
    business_name = db.Column(db.String, nullable=False)
    customer_service_number = db.Column(db.String, nullable=False)
    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
    }
    # FK
    business_address_ID = db.Column(db.ForeignKey("Address.address_ID"))

    # relationship
    business_address = db.relationship(
        "Address", foreign_keys=[business_address_ID])

    def __repr__(self):
        return f"Local_Vendor email {self.email} {self.first_name, self.last_name}"
