# Projeto Final de Banco de Dados II

## Bancos de Dados

### Postgres

Tabela com as informações geométricas das localizações
```sql
CREATE TABLE localizacoes(
    id VARCHAR(255),
    nome VARCHAR(255),
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