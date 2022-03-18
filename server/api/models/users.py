from . import db

from werkzeug.security import generate_password_hash, check_password_hash


class Users(db.Model):
    __tablename__ = "Users"

    email = db.Column(db.String, nullable=False, primary_key=True)
    password = db.Column(db.Text)
    jwt_auth_active = db.Column(db.Boolean())

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

    def update_password(self, new_password):
        hashed = generate_password_hash(new_password)
        self.password = hashed

    def check_jwt_auth_active(self):
        return self.jwt_auth_active

    def set_jwt_auth_active(self, set_status):
        self.jwt_auth_active = set_status

    @classmethod
    def get_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def toDICT(self):

        cls_dict = {}
        cls_dict["email"] = self.email

        return cls_dict

    def toJSON(self):
        return self.toDICT()
