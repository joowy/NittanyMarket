from . import db


class Zipcode_Info(db.Model):
    __tablename__ = "Zipcode_Info"

    zipcode = db.Column(db.String(5), primary_key=True)
    city = db.Column(db.String(120))
    state_id = db.Column(db.String)
    population = db.Column(db.Integer)
    density = db.Column(db.Float)
    county_name = db.Column(db.String)
    timezone = db.Column(db.String)

    def save(self):
        db.session.add(self)
        db.session.commit()
