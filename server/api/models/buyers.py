
class Buyers(Users):
    __tablename__ = "Buyers"

    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64))
    gender = db.Column(db.String(64))
    age = db.Column(db.Integer(), nullable=False)
    home_address_id = db.Column(db.Integer())
    billing_address_id = db.Column(db.Integer())

    def __repr__(self):
        return f"email {self.email} \nname {self.first_name, self.last_name}"

    def save(self):
        db.session.add(self)
        db.session.commit()
