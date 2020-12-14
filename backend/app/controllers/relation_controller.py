from app import app
from flask import jsonify, request
from app.database.neo4j_connection import driver
from app.controllers.graduates_controller import detail_graduate
from app.controllers.company_controller import detail_company


# criação de relacionamento entre egresso e empresa("egresso trabalha na empresa")
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


# Listagem de Egressos que trabalham em uma empresa "X"
@app.route("/relation/work/<string:id>", methods=['GET'])
def list_relation_company(id):
    statement = (
        "MATCH(e:Egresso)-[t:Trabalha]->(c:Empresa {chave: $id}) return e.chave, t.desde "
    )
    result = driver.session().run(statement, id=id)
    response = []
    for record in result:
        graduate = detail_graduate(record[0])
        graduate["desde"] = record[1]
        response.append(graduate)

    return jsonify(response)


# Listagem de Empresas que um Egresso "X" trabalha
@app.route("/relation/egresso/<string:id>", methods=['GET'])
def list_relation_egresso(id):
    statement = (
        "MATCH(c:Empresa)<-[t:Trabalha]-(e:Egresso {chave: $id}) return c.chave, t.desde "
    )
    result = driver.session().run(statement, id=id)
    response = []
    for record in result:
        company = detail_company(record[0])
        company["desde"] = record[1]
        response.append(company)

    return jsonify(response)


# Alterar Relação trabalha para Trabalhou
@app.route("/relation/<string:id>", methods=['PUT'])
def list_relation_trabalhou(id):
    data = request.json
    statement = (
        "MATCH(e:Egresso {chave: $id})-[t:Trabalha]->(c:Empresa {chave: $id_empresa})"
        "CREATE(e)-[:Trabalhou {de: t.desde, ate: $data}]->(c)"
        "DELETE(t)"
    )
    driver.session().run(statement, id=id, id_empresa=data["empresa"], data=data["data"])

    return {"msg": "Relacionamento atualizado!"}


# lisagem de ex funcionarios de uma empresas "X"
@app.route("/relation/worked/<string:id>", methods=['GET'])
def list_relation_company_worked(id):
    statement = (
        "MATCH(e:Egresso)-[t:Trabalhou]->(c:Empresa {chave: $id}) return e.chave, t.de, t.ate "
    )
    result = driver.session().run(statement, id=id)
    response = []
    for record in result:
        graduate = detail_graduate(record[0])
        graduate["de"] = record[1]
        graduate["ate"] = record[2]
        response.append(graduate)

    return jsonify(response)


# listagem de empresas que um Egresso trabalhou
@app.route("/relation/egressoWorked/<string:id>", methods=['GET'])
def list_relation_egresso_worked(id):
    statement = (
        "MATCH(c:Empresa)<-[t:Trabalhou]-(e:Egresso {chave: $id}) return c.chave, t.de, t.ate ")
    result = driver.session().run(statement, id=id)
    response = []
    for record in result:
        company = detail_company(record[0])
        company["de"] = record[1]
        company["ate"] = record[2]
        response.append(company)

    return jsonify(response)
