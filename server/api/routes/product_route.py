from datetime import datetime
from typing import List

from api.models import Categories, Product_Listing, db
from flask import request
from flask_restx import Namespace, Resource, fields
from sqlalchemy import func

api = Namespace("Products", description="Products related routes")


product_hierarchy_model = api.model(
    "ProductHierarchy", {"category_name": fields.String(required=True),},
)
product_hierarchy_model["parent_category"] = fields.Nested(product_hierarchy_model)
error_model = api.model("Error", {"success": fields.Boolean, "msg": fields.String,})


@api.route("/category/", defaults={"category": None})
@api.route("/category/<category>")
@api.doc(params={"category": "category name, empty to get all listings not filtered"})
class GetProducts(Resource):
    def get(self, category):
        print(category)
        if category:
            products_list = (
                db.session.query(Product_Listing)
                .filter(Product_Listing.category == category)
                .all()
            )
        else:
            products_list = db.session.query(Product_Listing).limit(20).all()
        out = []
        for i in products_list:
            out.append(i.to_dict())

        return out, 200


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
        categories = Categories.query.all()
        lst: List[(str, str)] = []
        for relationship in categories:
            lst.append((relationship.parent_category, relationship.category_name))

        def make_tree(pc_list):
            results = {}
            for record in pc_list:
                parent_id = record[0]
                id = record[1]

                if id in results:
                    node = results[id]
                else:
                    node = results[id] = {}
                node["name"] = id
                if parent_id != id:
                    if parent_id in results:
                        parent = results[parent_id]
                    else:
                        parent = results[parent_id] = {}
                    if "children" in parent:
                        parent["children"].append(node)
                    else:
                        parent["children"] = [node]

            # assuming we wanted node id #0 as the top of the tree
            # print(results)
            return results["Root"]

        return make_tree(lst), 200


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
                "email": _product_name,
                "msg": f"{_product_name} was successfully created, id: {new_listing.listing_id}",
            },
            200,
        )


@api.route("/delist")
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

        product_listing_record.product_active_end = datetime.now()
        db.session.commit()
        return (
            {
                "success": True,
                "listing_id": _listing_id,
                "msg": f"item id {_listing_id} was successfully delisted",
            },
            200,
        )
