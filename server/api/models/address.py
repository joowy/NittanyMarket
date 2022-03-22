from . import db


class Address(db.Model):
    __tablename__ = "Address"
    address_ID = db.Column(db.String, primary_key=True)
    zipcode = db.Column(
        db.String, db.ForeignKey("Zipcode_Info.zipcode"), nullable=False
    )
    street_num = db.Column(db.String, nullable=False)
    street_name = db.Column(db.String, nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()

    zipcode_relationship = db.relationship("Zipcode_Info", foreign_keys=[zipcode])

    def toDICT(self):
        cls_dict = {}
        cls_dict["address_ID"] = self.address_ID
        cls_dict["zipcode"] = self.zipcode
        cls_dict["street_num"] = self.street_num
        cls_dict["street_name"] = self.street_name

        return cls_dict
