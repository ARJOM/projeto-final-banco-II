from app import app
from flask import jsonify, request
from bson.objectid import ObjectId
from app.database.mongo_connection import conn_mongo as mongo
from app.database.neo4j_connection import driver


@app.route("/graduate", methods=['GET'])
def list_graduate():
    colecao = mongo.egressos
    result = []
    for item in colecao.find():
        item['_id'] = str(item['_id'])
        result.append(item)
    return jsonify(result)


@app.route("/graduate/<string:id>", methods=['GET'])
def detail_graduate(id):
    colecao = mongo.egressos
    result = colecao.find_one({"_id": ObjectId(id)})
    result["_id"] = str(result["_id"])
    return result


@app.route("/graduate", methods=['POST'])
def create_graduate():
    colecao = mongo.egressos
    data = request.json

    # Verifica se já existe um egresso com a matricula informada
    egressos = colecao.find({"matricula": data['matricula']})
    for _ in egressos:
        return {"msg": "Já existe um egresso registrado com a matrícula informada"}, 403

    # Insere egresso no mongo
    egresso = colecao.insert_one(data)

    # Insere egresso no neo4j
    query = "CREATE(:Egresso {nome: $egresso_name, chave: $egresso_id})"
    with driver.session() as session:
        session.run(query, egresso_name=data['nome'], egresso_id=str(egresso.inserted_id))
    return {"msg": "Egresso registrado com sucesso"}


@app.route("/graduate/<string:id>", methods=['PUT'])
def update_graduate(id):
    colecao = mongo.egressos
    data = request.json
    colecao.update_one({"_id": ObjectId(id)}, {"$set": data})
    return {"msg": "Egresso atualizado com sucesso"}


@app.route("/graduate/<string:id>", methods=['DELETE'])
def delete_graduate(id):
    colecao = mongo.egressos
    colecao.delete_one({"_id": ObjectId(id)})
    return {"msg": "Egresso removido com sucesso"}
