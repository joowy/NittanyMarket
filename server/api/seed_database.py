# from api import app
import os
import csv
from werkzeug.security import generate_password_hash
from datetime import datetime

from .models import (
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


def seed_all():

    tables = db.metadata.tables.keys()
    empty_tables = []
    # seed table only if table is empty
    for table_name in tables:
        for modelClass in db.Model.registry._class_registry.values():
            if (
                hasattr(modelClass, "__tablename__")
                and modelClass.__tablename__ == table_name
            ):
                num_rows = db.session.query(modelClass).count()
                if num_rows == 0:
                    empty_tables.append(modelClass)

    table_name = None
    for table in empty_tables:
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
                    record[6] = record[6].strip("$").replace(",", "").strip('"').strip()
                elif table_name == "Orders":
                    # convert record date to date time object
                    record[4] = datetime.strptime(record[4], "%m/%d/%y")
                elif table_name == "Ratings":
                    record[2] = datetime.strptime(record[2], "%m/%d/%y")
                elif table_name == "Zipcode_Info":
                    # convert empty strings to None/Null type
                    for i in range(len(record)):
                        if record[i] == "":
                            record[i] = None
                db.session.execute(
                    db.insert(
                        table,
                        values=record,
                        # handle table heirachy
                        prefixes=["OR IGNORE"],
                    )
                )
            db.session.commit()
        except Exception as e:
            print(f"{table_name} seed error", e)
            db.session.rollback()


if __name__ == "__main__":
    print("seeding all")
    seed_all()
