# Projeto Final de Banco de Dados II

## Bancos de Dados

### Postgres

Tabela com as informações geométricas das localizações
```sql
CREATE TABLE localizacoes(
    id VARCHAR(255),
    geom GEOMETRY,
    CONSTRAINT local_pk PRIMARY KEY (id)
)
```

### MongoDB

Colecao de Usuário
```
{
    nome: string,
    matricula: string,
    curso: string
}
```

Colecao de Empresa
```
{
    id: string,
    nome: string
}
```


### Neo4J

Deve manter os relacionamentos entre Usuários e Empresas, tendo relacionamentos do tipo `trabalha` ou `trabalhou`.

## Executando Backend

1. Criar ambiente virtual
    ```
    python3 -m venv venv
    ```
2. Ativar ambiente virtual
    ```
    source venv/bin/activate
    ```
   2.1. Atualizar o pip
   ```
    pip install --upgrade pip
    ```
3. Instalar dependências
    ```
    pip install -r requirements.txt
    ```
4. Criar arquivo .env na raiz do projeto, e preencher o seguinte modelo
    ```
    DB_NAME=
    PSQL_HOST=
    PSQL_USER=
    PSQL_PASSWORD=

    MONGO_DB_NAME=
    MONGO_HOST=
    MONGO_PORT=

    NEO4J_USER=
    NEO4J_HOST=
    NEO4J_PORT=
    NEO4J_PASSWORD=
    ``` 
5. Executar o servidor do projeto
    ```
    python run.py
    ```
