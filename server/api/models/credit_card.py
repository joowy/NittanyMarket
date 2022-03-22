from . import db


class Credit_Cards(db.Model):
    __tablename__ = "Credit_Cards"

    credit_card_num = db.Column(db.String, primary_key=True)
    card_code = db.Column(db.Integer, nullable=False,)
    expire_month = db.Column(db.String, nullable=False,)
    expire_year = db.Column(db.String, nullable=False,)
    card_type = db.Column(db.String)
    owner_email = db.Column(
        db.ForeignKey("Buyers.email", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=False,
    )

    # def __repr__(self):
    #     return f"credit_card_num {self.credit_card_num}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):

        cls_dict = {}
        cls_dict["credit_card_num"] = self.credit_card_num
        cls_dict["card_code"] = self.card_code
        cls_dict["expire_month"] = self.expire_month
        cls_dict["expire_year"] = self.expire_year
        cls_dict["card_type"] = self.card_type
        cls_dict["owner_email"] = self.owner_email
        return cls_dict
