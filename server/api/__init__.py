
import json

from flask import Flask
from flask_cors import CORS

from .seed_database import seed_all

from sqlalchemy.sql import text, column

from .routes.users_route import rest_api
from .models import Buyers, Sellers, Users, db, Address

from .config import Config


app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
rest_api.init_app(app)
CORS(app)


# Setup database


@app.before_first_request
def initialize_database():
    db.create_all()

    tables = db.metadata.tables.keys()
    empty_tables = []
    # seed table only if table is empty
    for table_name in tables:
        for modelClass in db.Model.registry._class_registry.values():
            if hasattr(modelClass, '__tablename__') and modelClass.__tablename__ == table_name:
                num_rows = (db.session.query(modelClass).count())
                if num_rows == 0:
                    empty_tables.append(modelClass)
    print(tables, empty_tables)
    seed_all(tables_list=empty_tables)


"""
   Custom responses
"""


@app.after_request
def after_request(response):
    """
       Sends back a custom error with {"success", "msg"} format
    """

    if int(response.status_code) >= 400:

        response_data = json.loads(response.get_data())
        if "errors" in response_data:
            response_data = {
                "success": False,
                "msg": list(response_data["errors"].items())[0][1],
            }
            response.set_data(json.dumps(response_data))
        response.headers.add("Content-Type", "application/json")
    return response
