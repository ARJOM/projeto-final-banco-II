from app import app
from flask import jsonify, request
from app.database.neo4j_connection import driver

#criação de relacionamento entre egresso e empresa("egresso trabalha na empresa")
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

#Listagem de Egressos que trabalham em uma empresa "X"
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

#Listagem de Empresas que um Egresso "X" trabalha
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

#Alterar Relação trabalha para Trabalhou
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

#lisagem de ex funcionarios de uma empresas "X"
@app.route("/relation/worked/<string:id>", methods=['GET'])
def list_relation_company_worked(id):
    statement = (
        "MATCH(e:Egresso)-[t:Trabalhou]->(c:Empresa {chave: $id}) return e.chave, e.nome, t.de, t.ate "
    )
    result = driver.session().run(statement, id=id)
    response = []
    for record in result:
        response.append({"chave":record[0],"nome":record[1], "de":record[2], "ate": record[3]})

    return jsonify(response)