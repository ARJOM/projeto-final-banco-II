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
    driver.session().run(statement, egresso=data["egresso"], empresa=data["empresa"], data=data['data'])
    return {"msg": "Relacionamento criado com sucesso!"}
