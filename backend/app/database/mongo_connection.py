import os
from pymongo import MongoClient
from dotenv import load_dotenv


# Carregando dados do ambiente virtual
load_dotenv()

MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")
MONGO_HOST = os.getenv("MONGO_HOST")
MONGO_PORT = int(os.getenv("MONGO_PORT"))

client = MongoClient(MONGO_HOST, MONGO_PORT)
conn_mongo = client[MONGO_DB_NAME]
