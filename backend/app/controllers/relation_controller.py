from app import app
from flask import jsonify, request
from app.database.neo4j_connection import driver


@app.route("/relation", methods=['POST'])
def create_relation():
    data = request.json
    statement = (
        "MATCH (e:Egresso {chave: $egresso})"
        "MATCH (c:Empresa {chave: $empresa})"
        "CREATE (e)-[:Trabalha {desde: $data}]->(c)"
    )
    driver.session().run(
        statement, egresso=data["egresso"], empresa=data["empresa"], data=data['data'])
    return {"msg": "Relacionamento criado com sucesso!"}


@app.route("/relation/work/<string:id>", methods=['GET'])
def list_relation_company(id):
    statement = (
        "MATCH(e:Egresso)-[t:Trabalha]->(c:Empresa {chave: $id}) return e.chave, e.nome, t.desde "
    )
    result = driver.session().run(statement, id=id)
    response = []
    for record in result:
        response.append({"chave":record[0],"nome":record[1], "desde":record[2]})

    return jsonify(response)


@app.route("/relation/egresso/<string:id>", methods=['GET'])
def list_relation_egresso(id):
    statement = (
        "MATCH(c:Empresa)<-[t:Trabalha]-(e:Egresso {chave: $id}) return c.chave, c.nome, t.desde "
    )
    result = driver.session().run(statement, id=id)
    response = []
    for record in result:
        response.append({"chave":record[0],"nome":record[1], "desde":record[2]})

    return jsonify(response)