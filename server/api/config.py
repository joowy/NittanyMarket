import os
from datetime import timedelta
from dotenv import load_dotenv, find_dotenv

BASE_DIR = os.path.dirname(os.path.realpath(__file__))

load_dotenv(find_dotenv())


class Config:

    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(BASE_DIR, "database.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get("SECRET_KEY")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY")
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=30)
    # SQLALCHEMY_ECHO = True

