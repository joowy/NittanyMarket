# from api import app
import os
import csv
from werkzeug.security import generate_password_hash
from datetime import datetime

from .models import(
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

file_path = os.path.dirname(os.path.realpath(__file__))
mock_data_dir = os.path.join(file_path, "mock")


def seed_all(tables_list=[Address, Users, Buyers, Sellers, Local_Vendors, Categories, Product_Listing, Orders, Credit_Cards, Zipcode_Info, Reviews, Ratings, ]):

    table_name = None
    for table in tables_list:
        table_name = table.__tablename__
        try:
            file = os.path.join(mock_data_dir, f"{table_name}.csv")
            data = csv.reader(open(file, encoding="cp1252"))
            # skip header row
            next(data)
            print(f"seeding {table_name}")
            for record in data:
                if table_name == "Users":
                    # run hash on password
                    record[1] = generate_password_hash(record[1])

                elif table_name == "Product_Listing":
                    # prices are strings starting with $
                    record[6] = record[6].strip("$").replace(
                        ",", "").strip('"').strip()
                elif table_name == "Orders":
                    # convert record date to date time object
                    record[4] = datetime.strptime(record[4], "%m/%d/%y")
                elif table_name == "Zipcode_Info":
                    # convert empty strings to None/Null type
                    for i in range(len(record)):
                        if record[i] == '':
                            record[i] = None
                db.session.execute(
                    db.insert(table, values=record,
                              # handle table heirachy
                              prefixes=["OR IGNORE"]))
            db.session.commit()
        except Exception as e:
            print(f"{table_name} seed error", e)
            db.session.rollback()


if __name__ == '__main__':
    print("seeding all")
    seed_all()
