

from api import app
from api.models import Users, Buyers, Address
import os
import csv
file_path = os.path.dirname(os.path.realpath(__file__))
mock_data_dir = os.path.join(file_path, "api/mock")
print(mock_data_dir)


def seed_address():
    with app.app_context():
        address_file = os.path.join(mock_data_dir, "Address.csv")
        # with open(address_file) as addresses:
        #     reader = csv.DictReader(addresses, delimiter=",", quotechar='"')
        #     data_read = [row for row in reader]
        #     print(data_read)
        data = csv.reader(open(address_file))
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
                    street_name=street_name
                )
                new_record.save()


if __name__ == '__main__':
    print("seeding")
    seed_address()
# seed_address()
