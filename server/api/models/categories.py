from . import db 


class Categories(db.Model):
    __tablename__ = "Categories"
    parent_category = db.Column(db.ForeignKey("Categories.category_name"))
    category_name = db.Column(db.String, primary_key=True)

    def __repr__(self):
        return f"Categories parent {self.parent_category}, name {self.category_name}"
