from importlib.resources import path
from flask_restx import Api


rest_api = Api(version="1.0", title="Nittany Market API")


from .users_route import api as usersNs
from .auth_route import api as buyersAuthNs
from .product_route import api as productNs
from .cart_route import api as cartNs
from .review_route import api as reviewNs
from .rating_route import api as ratingNs

# from .order_route import api as orderNs

# rest_api.add_namespace(
#     userNs,
#     # took me forever(1.5 hrs) to figure this out😭. need to specify prefix url
#     path="/",
# )

rest_api.add_namespace(buyersAuthNs, path="/api/auth")
rest_api.add_namespace(usersNs, path="/api/users")
rest_api.add_namespace(productNs, path="/api/product")
# rest_api.add_namespace(orderNs, path="/api/order")
rest_api.add_namespace(cartNs, path="/api/cart")
rest_api.add_namespace(reviewNs, path="/api/reviews")
rest_api.add_namespace(ratingNs, path="/api/ratings")
