from .rating import Ratings
from .reviews import Reviews
from .zipcode_info import Zipcode_Info
from .product_listings import Credit_Cards
from .credit_card import Orders
from .orders import Product_Listing
from .categories import Categories
from .local_vendors import Local_Vendors
from .sellers import Sellers
from .buyers import Buyers
from .users import Users
from .address import Address
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()
