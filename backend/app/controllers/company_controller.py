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

@app.route("/company", methods=['POST'])
def create_company():
    colecao = mongo.empresas
    data = request.json

    # Verifica se já existe uma empresa com o nome informado
    empresas = colecao.find({"nome": data['nome']})
    for _ in empresas:
        return {"msg": "Já existe uma empresa registrada com o nome informado"}, 403

    # Insere empresa
    colecao.insert_one(data)
    return {"msg": "Empresa registrada com sucesso"}

@app.route("/company/<string:id>", methods=['PUT'])
def update_company(id):
    colecao = mongo.empresas
    data = request.json
    colecao.update_one({"_id": ObjectId(id)}, {"$set": data})
    return {"msg": "Empresa atualizada com sucesso"}
