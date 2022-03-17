

from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.declarative import DeclarativeMeta


db = SQLAlchemy()


class Users(db.Model):
    __abstract__ = True

    email = db.Column(db.String(64), nullable=False,  primary_key=True)
    password = db.Column(db.Text())

    def __repr__(self):
        return f"Email {self.email}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def update_email(self, new_email):
        self.email = new_email

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict["email"] = self.email

        return cls_dict

    def toJSON(self):
        return self.toDICT()


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


class Credit_Card(db.Model):
    __tablename__ = 'Credit_Card'

    credit_card_num = db.Column(db.Integer, primary_key=True)
    card_code = db.Column(db.Integer)
    expire_month = db.Column(db.String(64))
    expire_year = db.Column(db.String(64))
    card_type = db.Column(db.String(64))
    Owner_email = db.Column(db.Integer, db.ForeignKey('Buyers.email',
                                                      onupdate='CASCADE',
                                                      ondelete='CASCADE'),
                            index=True, nullable=False)

    def __repr__(self):
        return f"credit_card_num {self.credit_card_num}"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Zipcode_Info(db.Model):
    zipcode = db.Column(db.String(5), primary_key=True)
    city = db.Column(db.String(64))
    state_id = db.Column(db.Integer)
    population = db.Column(db.Integer)
    density = db.Column(db.Float)
    county_name = db.Column(db.String(64))
    timezone = db.Column(db.String(64))


class Address(db.Model):
    __tablename__ = 'Address'
    address_ID = db.Column()
    zipcode = db.Column()
    street_num = db.Column()
    street_name = db.Column()
