from app import app
from flask import jsonify, request
from app.database.mongo_connection import conn_mongo as mongo


@app.route("/graduate", methods=['GET'])
def list_graduate():
    colecao = mongo.egressos
    result = []
    for item in colecao.find():
        item['__id'] = str(item['__id'])
        result.append(item)
    return jsonify(result)
