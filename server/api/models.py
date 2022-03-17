

from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

# ---------------------Address-------------------------


class Address(db.Model):
    __tablename__ = 'Address'
    address_ID = db.Column(db.String, primary_key=True)
    zipcode = db.Column(db.String)
    street_num = db.Column(db.String)
    street_name = db.Column(db.String)

    def save(self):
        db.session.add(self)
        db.session.commit()


# ----------------------USERS---------------------------------------


class Users(db.Model):
    __abstract__ = True

    email = db.Column(db.String(64), nullable=False,  primary_key=True)
    password = db.Column(db.Text())

    def __repr__(self):
        return f"user Email {self.email}"

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
    age = db.Column(db.Integer, nullable=False)
    
    # FK
    home_address_id = db.Column(
        db.String, db.ForeignKey('Address.address_ID'))
    billing_address_id = db.Column(
        db.String, db.ForeignKey('Address.address_ID'))

    # relationship
    home_address = db.relationship(
        "Address", foreign_keys=[home_address_id])
    billing_address = db.relationship(
        "Address", foreign_keys=[billing_address_id])

    def __repr__(self):
        return f"buyers email {self.email} {self.first_name, self.last_name}"

    def save(self):
        db.session.add(self)
        db.session.commit()


# class Sellers(Buyers):
#     routing_number = db.Column()
#     account_number = db.Column()
#     balance = db.Column()

#     def __repr__(self):
#         return f"sellers email {self.email} \nname {self.first_name, self.last_name}"


# class Local_Vendor(Sellers):
#     business_name = db.Column()
#     customer_service_number = db.Column()
#     business_address_ID = db.Column()

#     def __repr__(self):
#         return f"Local_Vendor email {self.email} \nname {self.first_name, self.last_name}"

# -----------------------------------------------------------------------------------


# class Product_Listings(db.Model):
#     seller_email = db.Column()
#     listing_id = db.Column()
#     category = db.Column()
#     title = db.Column()
#     product_name = db.Column()
#     product_description = db.Column()
#     price = db.Column()
#     quantity = db.Column()


# class Categories(db.Model):

#     parent_category = db.Column()
#     category_name = db.Column()


# class Orders(db.Model):
#     transaction_id = db.Colum()
#     seller_email = db.Colum()
#     listing_id = db.Colum()
#     buyer_email = db.Colum()
#     date = db.Colum()
#     quantity = db.Colum()
#     payment = db.Colum()


# class Credit_Card(db.Model):
#     __tablename__ = 'Credit_Card'

#     credit_card_num = db.Column(db.Integer, primary_key=True)
#     card_code = db.Column(db.Integer)
#     expire_month = db.Column(db.String(64))
#     expire_year = db.Column(db.String(64))
#     card_type = db.Column(db.String(64))
#     Owner_email = db.Column(db.Integer, db.ForeignKey('Buyers.email',
#                                                       onupdate='CASCADE',
#                                                       ondelete='CASCADE'),
#                             index=True, nullable=False)

#     def __repr__(self):
#         return f"credit_card_num {self.credit_card_num}"

#     def save(self):
#         db.session.add(self)
#         db.session.commit()


# class Zipcode_Info(db.Model):
#     zipcode = db.Column(db.String(5), primary_key=True)
#     city = db.Column(db.String(120))
#     state_id = db.Column(db.Integer)
#     population = db.Column(db.Integer)
#     density = db.Column(db.Float)
#     county_name = db.Column(db.String(64))
#     timezone = db.Column(db.String(64))


# class Reviews(db.Model):
#     buyer_email = db.Column()
#     seller_email = db.Column()
#     listing_id = db.Column()
#     review_desc = db.Column()


# class Rating(db.Model):
#     Buyer_Email = db.Column()
#     Seller_Email = db.Column()
#     Rating = db.Column()
#     Rating_Desc = db.Column()
