

from . import db


class Address(db.Model):
    __tablename__ = "Address"
    address_ID = db.Column(db.String, primary_key=True)
    zipcode = db.Column(db.String, nullable=False)
    street_num = db.Column(db.String, nullable=False)
    street_name = db.Column(db.String, nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()
