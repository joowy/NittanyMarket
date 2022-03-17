from werkzeug.security import generate_password_hash, check_password_hash
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy(session_options={"autoflush": False})


# ---------------------Address-------------------------


class Address(db.Model):
    __tablename__ = "Address"
    address_ID = db.Column(db.String, primary_key=True)
    zipcode = db.Column(db.String, nullable=False)
    street_num = db.Column(db.String, nullable=False)
    street_name = db.Column(db.String, nullable=False)

    def save(self):
        db.session.add(self)
        db.session.commit()


# ----------------------USERS---------------------------------------
class Users(db.Model):
    __tablename__ = "Users"

    email = db.Column(db.String, nullable=False, primary_key=True)
    password = db.Column(db.Text)

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
    email = db.Column(db.ForeignKey("Users.email"), primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String)
    gender = db.Column(db.String)
    age = db.Column(db.Integer, nullable=False)
    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
    }

    # FK
    home_address_id = db.Column(db.ForeignKey("Address.address_ID"))
    billing_address_id = db.Column(db.ForeignKey("Address.address_ID"))

    # relationship
    home_address = db.relationship("Address", foreign_keys=[home_address_id])
    billing_address = db.relationship("Address", foreign_keys=[billing_address_id])

    def __repr__(self):
        return f"buyers email {self.email} {self.first_name, self.last_name}"


class Sellers(Users):
    __tablename__ = "Sellers"
    email = db.Column(db.ForeignKey("Users.email"), primary_key=True)
    routing_number = db.Column(db.String)
    account_number = db.Column(db.String)
    balance = db.Column(db.Float, default=0.0)
    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
    }

    def __repr__(self):
        return f"sellers email {self.email} {self.first_name, self.last_name}"


class Local_Vendor(Sellers):
    __tablename__ = "Local_Vendor"
    email = db.Column(db.ForeignKey("Sellers.email"), primary_key=True)
    business_name = db.Column(db.String, nullable=False)
    customer_service_number = db.Column(db.String, nullable=False)
    __mapper_args__ = {
        "polymorphic_identity": __tablename__,
    }
    # FK
    business_address_ID = db.Column(db.ForeignKey("Address.address_ID"))

    # relationship
    business_address = db.relationship("Address", foreign_keys=[business_address_ID])

    def __repr__(self):
        return f"Local_Vendor email {self.email} {self.first_name, self.last_name}"


# -----------------------------------------------------------------------------------


class Categories(db.Model):
    __tablename__ = "Categories"
    parent_category = db.Column(db.ForeignKey("Categories.category_name"))
    category_name = db.Column(db.String, primary_key=True)

    def __repr__(self):
        return f"Categories parent {self.parent_category}, name {self.category_name}"


class Product_Listings(db.Model):
    __tablename__ = "Product_Listings"

    seller_email = db.Column(db.ForeignKey("Sellers.email"), primary_key=True)
    listing_id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String, nullable=False)
    product_name = db.Column(db.String, nullable=False)
    product_description = db.Column(db.Text)
    price = db.Column(db.Float)
    quantity = db.Column(db.Integer)

    # FK
    category = db.Column(db.ForeignKey("Categories.category_name"))

    # relationship
    category_relationship = db.relationship("Categories", foreign_keys=[category])

    def __repr__(self):
        return f"Product_Listings seller_email listing_id {self.seller_email,self.listing_id, self.product_name}"


class Orders(db.Model):
    __tablename__ = "Orders"
    transaction_id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date)
    quantity = db.Column(db.Integer)
    payment = db.Column(db.Float)
    # FK
    buyer_email = db.Column(db.ForeignKey("Buyers.email"), nullable=False)
    seller_email = db.Column(db.ForeignKey("Sellers.email"), nullable=False)
    listing_id = db.Column(db.ForeignKey("Product_Listings.listing_id"), nullable=False)

    def __repr__(self):
        return f"buyer_email seller_email listing_id {self.buyer_email,self.seller_email, self.listing_id}"


class Credit_Card(db.Model):
    __tablename__ = "Credit_Card"

    credit_card_num = db.Column(db.String, primary_key=True)
    card_code = db.Column(db.Integer, nullable=False,)
    expire_month = db.Column(db.String, nullable=False,)
    expire_year = db.Column(db.String, nullable=False,)
    card_type = db.Column(db.String)
    owner_email = db.Column(
        db.ForeignKey("Buyers.email", onupdate="CASCADE", ondelete="CASCADE"),
        nullable=False,
    )

    def __repr__(self):
        return f"credit_card_num {self.credit_card_num}"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Zipcode_Info(db.Model):
    __tablename__ = "Zipcode_Info"

    zipcode = db.Column(db.String(5), primary_key=True)
    city = db.Column(db.String(120))
    state_id = db.Column(db.String)
    population = db.Column(db.Integer)
    density = db.Column(db.Float)
    county_name = db.Column(db.String)
    timezone = db.Column(db.String)

    def __repr__(self):
        return f"zipcode {self.zipcode}"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Reviews(db.Model):
    __tablename__ = "Reviews"

    buyer_email = db.Column(db.ForeignKey("Buyers.email"), primary_key=True)
    seller_email = db.Column(
        db.ForeignKey("Product_Listings.seller_email"), primary_key=True
    )
    listing_id = db.Column(
        db.ForeignKey("Product_Listings.listing_id"), primary_key=True
    )
    review_desc = db.Column(db.Text)

    def __repr__(self):
        return f"reviews buyer_email seller_email listing_id {self.buyer_email , self.seller_email , self.listing_id }"

    def save(self):
        db.session.add(self)
        db.session.commit()


class Rating(db.Model):
    __tablename__ = "Rating"

    buyer_email = db.Column(db.ForeignKey("Buyers.email"), primary_key=True)
    seller_email = db.Column(db.ForeignKey("Sellers.email"), primary_key=True)
    rating = db.Column(db.Float)
    rating_desc = db.Column(db.Text)

    def __repr__(self):
        return f"buyer_email seller_emailrating {self.buyer_email , self.seller_email , self.rating }"

    def save(self):
        db.session.add(self)
        db.session.commit()
