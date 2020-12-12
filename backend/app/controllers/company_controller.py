from app import app
from flask import jsonify, request
from bson.objectid import ObjectId
from app.database.mongo_connection import conn_mongo as mongo



@app.route("/company", methods=['GET'])
def list_company():
    colecao = mongo.empresas
    result = []
    for item in colecao.find():
        item['_id'] = str(item['_id'])
        result.append(item)
    return jsonify(result)


@app.route("/company/<string:id>", methods=['GET'])
def detail_company(id):
    colecao = mongo.empresas
    result = colecao.find_one({"_id": ObjectId(id)})
    result["_id"] = str(result["_id"])
    return result

