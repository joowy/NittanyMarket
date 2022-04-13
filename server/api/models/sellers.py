from .users import Users
from . import db


class Sellers(db.Model):
    __tablename__ = "Sellers"
    email = db.Column(
        db.ForeignKey(Users.email, onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True,
    )
    routing_number = db.Column(db.String)
    account_number = db.Column(db.String)
    balance = db.Column(db.Float, default=0.0)
    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
    }

    def __repr__(self):
        return f"sellers email {self.email}  "

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):

        cls_dict = {}
        cls_dict["email"] = self.email
        cls_dict["routing_number"] = self.routing_number
        cls_dict["account_number"] = self.account_number
        cls_dict["balance"] = self.balance

        return cls_dict
