import os
from neo4j import GraphDatabase
from dotenv import load_dotenv


# Carregando dados do .env
load_dotenv()

NEO4J_USER = os.getenv("NEO4J_USER")
NEO4J_HOST = os.getenv("NEO4J_HOST")
NEO4J_PORT = os.getenv("NEO4J_PORT")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

uri = f"neo4j://{NEO4J_HOST}:{NEO4J_PORT}"
driver = GraphDatabase.driver(uri, auth=(NEO4J_USER, NEO4J_PASSWORD))
