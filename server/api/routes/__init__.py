from flask_restx import Api


rest_api = Api(version="1.0", title="Nittany Market API")


from .users_route import api as usersNs
from .buyers_route import api as buyersNs

# rest_api.add_namespace(
#     userNs,
#     # took me forever(1.5 hr) to figure this out😭. need to specify prefix url
#     path="/",
# )

rest_api.add_namespace(
    buyersNs, path="/api/auth",
)

