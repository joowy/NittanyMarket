# from api import app
from datetime import date, datetime
from api.models import (
    db,
    Address,
    Users,
    Buyers,
    Sellers,
    Local_Vendors,
    Categories,
    Product_Listing,
    Orders,
    Credit_Cards,
    Zipcode_Info,
    Reviews,
    Ratings,
)


import os
import csv


file_path = os.path.dirname(os.path.realpath(__file__))
mock_data_dir = os.path.join(file_path, "mock")


def seed_address():
    # with app.app_context():
    address_file = os.path.join(mock_data_dir, "Address.csv")
    print("seeding address")
    try:
        data = csv.reader(open(address_file, encoding="utf-8-sig"))
        # skip header row
        next(data)
        for record in data:
            address_id = record[0]
            zipcode = record[1]
            street_num = record[2]
            street_name = record[3]

            new_record = Address(
                address_ID=address_id,
                zipcode=zipcode,
                street_num=street_num,
                street_name=street_name,
            )
            db.session.add(new_record)
        db.session.commit()
    except Exception as e:
        print("address seed error", e)
        db.session.rollback()


def seed_users():
    # with app.app_context():
    users_file = os.path.join(mock_data_dir, "Users.csv")
    print("seeding users")
    try:
        data = csv.reader(open(users_file, encoding="utf-8-sig"))
        # skip header row
        next(data)
        for record in data:
            email = record[0]
            password = record[1]
            new_record = Users(email=email, password=password)

            db.session.add(new_record)
        db.session.commit()
    except Exception as e:
        print("user seed error", e)
        db.session.rollback()


def seed_buyers():
    # with app.app_context():
    buyers_file = os.path.join(mock_data_dir, "Buyers.csv")
    print("seeding buyers")
    try:
        data = csv.reader(open(buyers_file, encoding="utf-8-sig"))
        # skip header row
        next(data)

        for record in data:
            # do not insert into users table if buyer's user record already exits
            db.session.execute(db.insert(Buyers, values=record, prefixes=["OR IGNORE"]))

        db.session.commit()
    except Exception as e:
        print("buyer seed error", e)
        db.session.rollback()


def seed_sellers():
    # with app.app_context():
    sellers_file = os.path.join(mock_data_dir, "Sellers.csv")
    print("seeding sellers")
    try:
        data = csv.reader(open(sellers_file, encoding="utf-8-sig"))
        # skip header row
        next(data)
        for record in data:
            # do not insert into users table if buyer's user record already exits
            db.session.execute(
                db.insert(Sellers, values=record, prefixes=["OR IGNORE"])
            )

        db.session.commit()
    except Exception as e:
        print("buyer seed error", e)
        db.session.rollback()


def seed_categories():
    # with app.app_context():
    categories_file = os.path.join(mock_data_dir, "Categories.csv")
    print("seeding categories")
    try:
        data = csv.reader(open(categories_file, encoding="utf-8-sig"))
        # skip header row
        next(data)
        for record in data:
            # do not insert into users table if buyer's user record already exits
            db.session.execute(
                db.insert(Categories, values=record, prefixes=["OR IGNORE"])
            )

        db.session.commit()
    except Exception as e:
        print("buyer seed error", e)
        db.session.rollback()


def seed_all():

    tables_list = [
        Address,
        Users,
        Buyers,
        Sellers,
        Local_Vendors,
        Categories,
        Product_Listing,
        Orders,
        Credit_Cards,
        Zipcode_Info,
        Reviews,
        Ratings,
    ]
    table_name = None
    for t in tables_list:
        table_name = t.__tablename__
        file = os.path.join(mock_data_dir, f"{table_name}.csv")
        # print("seeding categories")
        try:
            data = csv.reader(open(file, encoding="cp1252"))
            # print(data)
            # skip header row
            next(data)
            for record in data:
                if table_name == "Product_Listing":
                    record[6] = record[6].strip("$").replace(",", "").strip('"').strip()

                elif table_name == "Orders":
                    record[4] = datetime.strptime(record[4], "%m/%d/%y")
                elif table_name == "Zipcode_Info":
                    print(record)
                    print(db.insert(t, values=record, prefixes=["OR IGNORE"]))
                # do not insert into users table if buyer's user record already exits
                db.session.execute(db.insert(t, values=record, prefixes=["OR IGNORE"]))
            db.session.commit()
        except Exception as e:
            print(f"{table_name} seed error", e)
            db.session.rollback()


# if __name__ == '__main__':
#     print("seeding")
#     seed_address()
# # seed_address()
