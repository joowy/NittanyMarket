

from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()


from .address import Address
from .users import Users
from .buyers import Buyers
from .sellers import Sellers
from .local_vendors import Local_Vendors
from .categories import Categories
from .orders import Orders
from .credit_card import Credit_Cards
from .product_listings import Product_Listing
from .zipcode_info import Zipcode_Info
from .reviews import Reviews
from .rating import Ratings
from .jwttokenblocklist import JWTTokenBlocklist