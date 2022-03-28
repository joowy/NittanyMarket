from typing import List
from sqlalchemy_serializer import SerializerMixin
from . import db


class Categories(db.Model, SerializerMixin):
    __tablename__ = "Categories"
    parent_category = db.Column(db.ForeignKey("Categories.category_name"))
    category_name = db.Column(db.String, primary_key=True)
    # def __repr__(self):
    #     return f"Categories parent {self.parent_category}, name {self.category_name}"

    def save(self):
        db.session.add(self)
        db.session.commit()

    def toDICT(self):

        cls_dict = {}
        cls_dict["parent_category"] = self.parent_category
        cls_dict["category_name"] = self.category_name

        return cls_dict
