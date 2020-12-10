from app import app
from flask import jsonify, request
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


@app.route("/location", methods=['POST'])
def create():
    data = request.json
    cursor = psql.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # Verifica se já existe uma localização registrada com o id passado
    statement = f"SELECT id FROM localizacoes WHERE id='{data['id']}'"
    cursor.execute(statement)
    location = cursor.fetchone()
    if location is not None:
        return {"msg": "Já existe uma localização registrada com o id informado"}, 403

    # Cria a entidade
    geom_statement = f"POINT({data['lat']} {data['long']})"
    statement = f"INSERT INTO localizacoes(id, nome, geom) " \
                f"VALUES ('{data['id']}', '{data['nome']}', ST_GeomFromText('{geom_statement}'))"
    try:
        cursor.execute(statement)
        psql.commit()
    except:
        return {"msg": "Erro ao cadastrar"}, 500

    cursor.close()
    return {"msg": "Localização criada com sucesso"}


@app.route("/location/<string:id>", methods=['PUT'])
def update(id):
    data = request.json
    cursor = psql.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # Verifica se já existe esse id passado
    statement = f"SELECT id FROM localizacoes WHERE id='{id}'"
    cursor.execute(statement)
    location = cursor.fetchone()
    if location is None:
        return {"msg": "Não existe esse id registrado "}, 403

    # update dados
    geom_statement = f"POINT({data['lat']} {data['long']})"
    statement = f"UPDATE localizacoes "\
                f"SET nome = '{data['nome']}', geom = ST_GeomFromText('{geom_statement}') "\
                f"WHERE id = '{id}'"

    try:
        cursor.execute(statement)
        psql.commit()
    except:
        return {"msg": "Erro ao atualizar informações"}, 500

    cursor.close()
    return {"msg": "Atualizado com sucesso"}


@app.route("/location/<string:id>", methods=['DELETE'])
def delete(id):
    data = request.json
    cursor = psql.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    # Verifica se já existe esse id passado
    statement = f"SELECT id FROM localizacoes WHERE id='{id}'"
    cursor.execute(statement)
    location = cursor.fetchone()
    if location is None:
        return {"msg": "Não existe esse id registrado "}, 403

    #Deletar localização
    statement= f"DELETE FROM localizacoes where id = '{id}'"

    try:
        cursor.execute(statement)
        psql.commit()
    except:
        return {"msg": "Erro ao deletar localização "}, 500

    cursor.close()
    return {"msg": "deletado com sucesso"}
