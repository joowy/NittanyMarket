# from api import app
from api.models import Users, Buyers, Address, db
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
        for record in data:
            address_id = record[0]
            zipcode = record[1]
            street_num = record[2]
            street_name = record[3]
            if zipcode != "zipcode":
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
        for record in data:
            email = record[0]
            password = record[1]

            if email != "email":
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
        for record in data:
            email = record[0]
            first_name = record[1]
            last_name = record[2]
            gender = record[3]
            age = record[4]
            home_address_id = record[5]
            billing_address_id = record[6]

            if email != "email":
                new_record = Buyers(
                    email=email,
                    first_name=first_name,
                    last_name=last_name,
                    gender=gender,
                    age=age,
                    home_address_id=home_address_id,
                    billing_address_id=billing_address_id,
                )

                db.session.add(new_record)
        db.session.commit()
    except Exception as e:
        print("buyer seed error", e)
        db.session.rollback()


# if __name__ == '__main__':
#     print("seeding")
#     seed_address()
# # seed_address()
