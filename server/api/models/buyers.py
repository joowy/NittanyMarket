from . import db
from .users import Users


class Buyers(Users):
    __tablename__ = "Buyers"
    email = db.Column(
        db.ForeignKey("Users.email", onupdate="CASCADE", ondelete="CASCADE"),
        primary_key=True,
    )
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String)
    gender = db.Column(db.String)
    age = db.Column(db.Integer)
    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
    }

    # FK
    home_address_id = db.Column(db.ForeignKey("Address.address_ID"))
    billing_address_id = db.Column(db.ForeignKey("Address.address_ID"))

    # relationship
    home_address = db.relationship("Address", foreign_keys=[home_address_id])
    billing_address = db.relationship("Address", foreign_keys=[billing_address_id])

    # def __repr__(self):
    #     return f"buyers email {self.email} {self.first_name, self.last_name, self.home_address_id}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()
