# Exercício 3

Este projeto demonstra a orquestração e inicialização de um banco de dados NoSQL (MongoDB) utilizando **Docker Compose**, garantindo que os dados e o esquema inicial sejam carregados automaticamente no primeiro boot do container.

## 📁 Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
ex003-bootcamp/
├── db/
│   └── init-schema.js
├── docker-compose.yml
└── README.md
```

A pasta `db` contém o script JavaScript necessário para a inicialização e inserção de dados no banco de dados MongoDB.

### 📝 Descrição dos Scripts

#### Scripts de Inicialização

O script na pasta `db/` é executado automaticamente na primeira inicialização do container:

* **`init-schema.js`**: Script JavaScript que:
    * Cria o banco de dados `orion_posts_db`
    * Cria a coleção `posts`
    * Insere 2 documentos iniciais na coleção `posts`:
        * **Post 1**: Contém `titulo`, `autor` e `conteudo` (estrutura básica)
        * **Post 2**: Contém `titulo`, `autor`, `conteudo` e `tags` (demonstrando a flexibilidade do schema NoSQL)
    * Executa uma consulta `find()` para listar todos os posts inseridos

**Características demonstradas:**
* **Schema Flexível**: MongoDB permite documentos com estruturas diferentes na mesma coleção
* **Campos Dinâmicos**: O segundo post possui o campo `tags` que não existe no primeiro post
* **Inicialização Automática**: O script é executado automaticamente na primeira inicialização do container

## 🔧 Bancos de Dados Orquestrados

O arquivo `docker-compose.yml` define dois serviços principais, interligados por uma rede customizada (`orion_network`), porém para esse exercício irei utilizar apenas o serviço `db_mongo`:

| Serviço | Tecnologia | Porta (Máquina:Container) | Volume de Dados |
| :--- | :--- | :--- | :--- |
| `db_postgres` | **PostgreSQL 16** | `5432:5432` | `postgres_data` |
| `db_mongo` | **MongoDB Latest** | `27017:27017` | `mongo_data` |

### 1. MongoDB (`db_mongo`)

* **Container Name:** `orion_mongo_db`
* **Imagem:** `mongo:latest`
* **Inicialização Automática:** O volume `- ./db/init-schema.js:/docker-entrypoint-initdb.d/init-schema.js` garante que o script JavaScript seja executado na **primeira** inicialização do container.
* **Healthcheck:** O container possui um healthcheck configurado que verifica se o banco está pronto para aceitar conexões usando `mongosh`.

* **Ordem de Execução dos Scripts de Inicialização:**
    1. `init-schema.js` - Cria o banco de dados `orion_posts_db`, a coleção `posts` e insere os documentos iniciais

* **Credenciais de Acesso:**
    * **Usuário Admin:** `orion_admin`
    * **Senha Admin:** `orion_admin_pass`
    * **Banco de Dados:** `orion_posts_db` (criado pelo script de inicialização)
    * **Porta:** `27017`


## 🚀 Como Inicializar o Projeto

1.  **Pré-requisito:** Certifique-se de ter o Docker e o Docker Compose instalados.
2.  Navegue até o diretório que contém o `docker-compose.yml`.
3.  Inicie os containers em modo *detached* (segundo plano):

    ```bash
    docker compose up -d
    ```

4.  O MongoDB será inicializado, executará o script JavaScript e estará pronto para uso. O PostgreSQL também estará ativo e configurado.

5. Conecte com as credenciais de acesso em um MongoDB Compass ou cliente MongoDB e utilize as consultas para realizar os testes.

### 🔌 Conectando ao Banco de Dados MongoDB

Você pode conectar ao banco de dados usando uma das seguintes opções:

**Opção 1: Via linha de comando (mongosh)**
```bash
docker exec -it orion_mongo_db mongosh -u orion_admin -p orion_admin_pass --authenticationDatabase admin
```

**Opção 2: Via MongoDB Compass**
- **Connection String:** `mongodb://orion_admin:orion_admin_pass@localhost:27017/?authSource=admin`
- Ou configure manualmente:
  - **Host:** `localhost`
  - **Porta:** `27017`
  - **Usuário:** `orion_admin`
  - **Senha:** `orion_admin_pass`
  - **Authentication Database:** `admin`

**Opção 3: String de conexão completa**
```
mongodb://orion_admin:orion_admin_pass@localhost:27017/orion_posts_db?authSource=admin
```

### 📊 Consultas Úteis

Após conectar ao banco de dados, você pode executar as seguintes consultas usando `mongosh`:

**Trocar para o banco de dados:**
```javascript
use orion_posts_db
```

**Listar todos os posts:**
```javascript
db.posts.find()
```

**Listar posts de forma formatada:**
```javascript
db.posts.find().pretty()
```

### Limpeza e Reinicialização

Se você precisar refazer a inicialização do banco de dados (re-executar o script JavaScript), use os seguintes comandos:

```bash
# 1. Para e remove os containers e a rede (mantém os dados)
docker compose down 

# 2. Para, remove os containers, a rede E OS VOLUMES DE DADOS persistidos (dados serão apagados!)
docker compose down -v 

# 3. Inicia o projeto novamente (forçando a execução do script JavaScript)
docker compose up -d
```

## 🔍 Diferenças entre SQL e NoSQL

Este exercício demonstra algumas das principais características do MongoDB (NoSQL) em comparação com bancos relacionais:

* **Schema Flexível**: Documentos na mesma coleção podem ter estruturas diferentes
* **Sem Joins**: MongoDB não possui JOINs como SQL, mas oferece operadores de agregação poderosos
* **Campos Dinâmicos**: Novos campos podem ser adicionados a documentos sem alterar a estrutura da coleção
* **Armazenamento em Documentos**: Dados são armazenados em formato BSON (Binary JSON)
* **Coleções vs Tabelas**: MongoDB usa coleções ao invés de tabelas

