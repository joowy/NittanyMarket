from datetime import datetime
import string
from typing import List

from api.models import Categories, Product_Listing, db, Ratings
from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy import func, desc


api = Namespace("Products", description="Products related routes")


product_hierarchy_model = api.model(
    "ProductHierarchy", {"category_name": fields.String(required=True),},
)
product_hierarchy_model["parent_category"] = fields.Nested(product_hierarchy_model)
error_model = api.model("Error", {"success": fields.Boolean, "msg": fields.String,})


def construct_category_heirachy():
    categories = Categories.query.all()
    # create list (parent, child) tuple easier to work with
    lst: List[(str, str)] = []
    for relationship in categories:
        lst.append(
            (relationship.parent_category.strip(), relationship.category_name.strip())
        )
    results = {}
    for record in lst:
        parent_product = record[0]
        product_name = record[1]
        if product_name in results:
            node = results[product_name]
        else:
            node = results[product_name] = {}

        node["name"] = product_name
        if parent_product != product_name:
            if parent_product in results:
                parent = results[parent_product]
            else:
                parent = results[parent_product] = {}
            if "children" in parent:
                parent["children"].append(node)
            else:
                parent["children"] = [node]
    return results


def get_flat_categories_list():
    categories = Categories.query.all()
    categories_set = set()
    for category in categories:
        categories_set.add(category.category_name)
    return categories_set


def get_seller_rating(seller_email):

    rating = 0
    seller_ratings = (
        db.session.query(Ratings).filter(Ratings.seller_email == seller_email).all()
    )

    for i in seller_ratings:
        rating += i.rating
    if seller_ratings:
        return rating / len(seller_ratings)
    return "No Rating"


@api.route("/category/", defaults={"category": None})
@api.route("/category/<category>")
@api.doc(params={"category": "category name, empty to get all listings not filtered"})
class GetProducts(Resource):
    def get(self, category):

        sub_catagories = []

        def recurse_dict(d):
            """
            find all sub categories 
            """
            name = d["name"]
            sub_catagories.append(name)
            if "children" in d:
                children = d["children"]
                for i in children:
                    recurse_dict(i)

        if category:
            category_children = construct_category_heirachy()[category]
            recurse_dict(category_children)
            products_list = (
                db.session.query(Product_Listing)
                .filter(Product_Listing.category.in_(sub_catagories))
                .filter(Product_Listing.product_active_end == None)
                .filter(Product_Listing.quantity > 0)
                .order_by(desc("product_active_start"))
                .all()
            )
        else:
            products_list = (
                db.session.query(Product_Listing)
                .filter(Product_Listing.product_active_end == None)
                .filter(Product_Listing.quantity > 0)
                .order_by(desc("product_active_start"))
                .limit(40)
                .all()
            )

        out = []
        for i in products_list:
            d = dict()

            seller_rating = get_seller_rating(i.seller_email)
            d.update(i.to_dict())
            d.update({"rating": seller_rating})
            out.append(d)
        return out, 200


@api.route("/<user_email>")
@api.doc(params={"user_email": "user's listed products"})
class UserProducts(Resource):
    def get(self, user_email):
        out = (
            db.session.query(Product_Listing)
            .filter(Product_Listing.seller_email == user_email)
            .order_by(desc("product_active_start"))
            .all()
        )

        products = []
        seller_rating = get_seller_rating(out[0].seller_email)
        for i in out:
            d = dict()
            d.update(i.to_dict())
            d.update({"rating": seller_rating})
            products.append(d)
        return products, 200


@api.route("/product_categories")
class ProductCategory(Resource):
    @api.response(
        model=product_hierarchy_model,
        code=200,
        description="get product category success",
    )
    @api.response(model=error_model, code=400, description="get product category fail")
    def get(self):
        """
        return json with nested product categories 
        """
        flat = request.args.get("flat", default=False, type=bool)

        if flat:
            return list(get_flat_categories_list())
        else:
            return construct_category_heirachy()["Root"]["children"], 200


@api.route("/list")
class ListProduct(Resource):
    def post(self):
        req_data = request.get_json()

        _seller_email = req_data.get("email")
        _category = req_data.get("category")
        _title = req_data.get("title")
        _product_name = req_data.get("product_name")
        _product_description = req_data.get("product_description")
        _price = req_data.get("price")
        _quantity = req_data.get("quantity")
        _listing_id = None
        # scuffed auto increment for product listing id since composite key
        try:
            _listing_id = (
                int(
                    (
                        db.session.query(
                            func.max(Product_Listing.listing_id).label("max_id"),
                        )
                        .group_by(Product_Listing.seller_email)
                        .filter(Product_Listing.seller_email == _seller_email)
                        .first()
                    )[0]
                )
                + 1
            )
        except:
            _listing_id = 1

        # check if req category is a category in data base
        try:
            categories_set = get_flat_categories_list()
            if _category not in categories_set:
                raise Exception(f"{_category} not in database")
            new_listing = Product_Listing(
                seller_email=_seller_email,
                listing_id=_listing_id,
                category=_category,
                title=_title,
                product_name=_product_name,
                product_description=_product_description,
                price=_price,
                quantity=_quantity,
                product_active_start=(datetime.now()),
            )
            new_listing.save()
            return (
                {
                    "success": True,
                    "name": _product_name,
                    "msg": f"{_product_name} was successfully created, id: {new_listing.listing_id}",
                },
                200,
            )
        except Exception as e:
            return (
                {"success": False, "name": _product_name, "msg": f"{str(e)}",},
                400,
            )


@api.route("/ChangeListingStatus")
class DelistProduct(Resource):
    def post(self):

        req_data = request.get_json()

        _seller_email = req_data.get("email")
        _listing_id = req_data.get("listing_id")
        product_listing_record = (
            db.session.query(Product_Listing)
            .filter(Product_Listing.seller_email == _seller_email)
            .filter(Product_Listing.listing_id == _listing_id)
        ).first()

        # if product is active, change it to not active, vice versa.
        product_listing_record.product_active_end = (
            None
            if product_listing_record.product_active_end != None
            else datetime.now()
        )
        db.session.commit()
        return (
            {
                "success": True,
                "listing_id": _listing_id,
                "msg": f"item id {_listing_id} listing status successfully updated {str(product_listing_record.product_active_end)}",
            },
            200,
        )


@api.route("/<seller_email>/<listing_id>")
class GetProduct(Resource):
    def get(self, seller_email, listing_id):

        listing = (
            db.session.query(Product_Listing)
            .filter(Product_Listing.seller_email == seller_email)
            .filter(Product_Listing.listing_id == listing_id)
            .first()
        )

        seller_rating = get_seller_rating(seller_email)

        out = listing.toDICT()

        out.update({"seller_rating": seller_rating})

        return out , 200
