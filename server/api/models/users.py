from . import db

from werkzeug.security import generate_password_hash, check_password_hash


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
