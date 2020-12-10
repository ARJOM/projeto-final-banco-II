from app import app
from flask import jsonify
import psycopg2.extras
from app.database.postgres_connection import conn_psql as psql


@app.route("/location", methods=['GET'])
def index():
    cursor = psql.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    statement = "SELECT * FROM localizacoes"
    cursor.execute(statement)
    result = cursor.fetchall()
    cursor.close()
    return jsonify(result)
