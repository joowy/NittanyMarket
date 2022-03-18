import json

from flask import Flask
from flask_cors import CORS

from .seed_database import seed_all


from .routes.users_route import rest_api
from .models import Buyers, Sellers, Users, db, Address

from .config import Config


app = Flask(__name__)

app.config.from_object(Config)

db.init_app(app)
rest_api.init_app(app)
CORS(app)


# Setup database
# @app.before_first_request
# def initialize_database():
# db.create_all()


# with app.app_context():
#     db.create_all()
#     seed_all()


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
