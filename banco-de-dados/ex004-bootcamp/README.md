# Exercício 4

Este projeto demonstra a orquestração e inicialização de um banco de dados NoSQL (MongoDB) usando **Docker Compose** com ambientes separados para **desenvolvimento** e **produção**. Os dados e o esquema inicial são carregados automaticamente na primeira inicialização do container. O exercício foca em consultar e filtrar dados por campos específicos, arrays e documentos aninhados.

## 📁 Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
ex004-bootcamp/
├── db/
│   ├── init-schema.js
│   └── consultas/
│       ├── consulta-tag-nosql.js
│       ├── consulta-por-autor.js
│       ├── consulta-comentarios.js
│       └── consulta-comentario-especifico.js
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── Dockerfile.dev
├── Dockerfile
├── .dockerignore
└── README.md
```

A pasta `db` contém scripts JavaScript para inicialização, inserção de dados e consultas de exemplo.

### 📝 Descrição dos Scripts

#### Scripts de Inicialização

O script `db/init-schema.js` é executado automaticamente na primeira inicialização do container:

* **`init-schema.js`**: Cria o banco de dados `orion_posts_db`, a coleção `posts` e insere 2 documentos:
    * **Post 1**: Contém `titulo`, `autor` e `conteudo`
    * **Post 2**: Contém `titulo`, `autor`, `conteudo` e `tags` (array: "schema", "flexivel", "infinito", "nosql")
    * Usa `updateOne()` para adicionar `comentarios` ao primeiro post (array de documentos com `autor`, `texto` e `data`)
    * Executa `find()` para listar todos os posts

**Características demonstradas:**
* **Schema Flexível**: Documentos com estruturas diferentes na mesma coleção
* **Campos Dinâmicos**: Campos opcionais (ex: `tags` apenas no Post 2)
* **Arrays**: Armazenamento de múltiplos valores
* **Documentos Aninhados**: Arrays de documentos (comentários)
* **Update com `updateOne()`**: Adição de campos a documentos existentes

#### Scripts de Consultas

Scripts utilitários em `db/consultas/` para consultas e filtros:

* **`consulta-tag-nosql.js`**: Posts com a tag "nosql" no array `tags`
* **`consulta-por-autor.js`**: Posts do autor "Felipe Gomes"
* **`consulta-comentarios.js`**: Posts que possuem comentários (verifica existência do campo)
* **`consulta-comentario-especifico.js`**: Posts com comentários do autor "João Silva" (notação de ponto em documentos aninhados)

## 🔧 Ambientes de Desenvolvimento e Produção

O projeto possui dois ambientes separados usando Docker Compose:

### Ambiente de Desenvolvimento (`docker-compose.dev.yml`)

* **Container:** `orion_mongo_db_dev`
* **Imagem:** `Dockerfile.dev`
* **Volumes:**
    * `./db/init-schema.js:/docker-entrypoint-initdb.d/init-schema.js` (montado do diretório local)
    * `mongo_data_dev:/data/db` (persistência de dados)
* **Características:**
    * Permite editar scripts sem reconstruir a imagem
    * Porta `27017` exposta

### Ambiente de Produção (`docker-compose.prod.yml`)

* **Container:** `orion_mongo_db_prod`
* **Imagem:** `Dockerfile` (otimizada)
* **Volumes:**
    * `mongo_data_prod:/data/db` (apenas volume nomeado)
    * Script incorporado na imagem durante o build
* **Características:**
    * Imagem otimizada e leve
    * `restart: unless-stopped`
    * Porta `27017` exposta
    * Sem dependência de arquivos locais

### Dockerfiles

* **`Dockerfile.dev`**: Baseado em `mongo:latest`. Não copia o script (montado via volume)
* **`Dockerfile`**: Baseado em `mongo:latest`. Copia `init-schema.js` para `/docker-entrypoint-initdb.d/`

### .dockerignore

Exclui do build: documentação, arquivos Git, docker-compose, scripts de consulta e arquivos temporários.

## 🚀 Como Inicializar o Projeto

**Pré-requisito:** Docker e Docker Compose instalados.

### Ambiente de Desenvolvimento

1. Navegue até o diretório do projeto:
   ```bash
   cd banco-de-dados/ex004-bootcamp
   ```

2. Inicie o ambiente:
   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

3. O MongoDB será inicializado e o script executado automaticamente.

### Ambiente de Produção

1. Navegue até o diretório do projeto:
   ```bash
   cd banco-de-dados/ex004-bootcamp
   ```

2. Construa e inicie o ambiente:
   ```bash
   docker compose -f docker-compose.prod.yml up -d --build
   ```

3. O MongoDB será inicializado com a imagem otimizada.

### 🔌 Conectando ao Banco de Dados MongoDB

**Via linha de comando (mongosh):**

Ambiente DEV:
```bash
docker exec -it orion_mongo_db_dev mongosh -u orion_admin -p orion_admin_pass --authenticationDatabase admin
```

Ambiente PROD:
```bash
docker exec -it orion_mongo_db_prod mongosh -u orion_admin -p orion_admin_pass --authenticationDatabase admin
```

**Via MongoDB Compass:**
- **Connection String:** `mongodb://orion_admin:orion_admin_pass@localhost:27017/?authSource=admin`
- Ou configure manualmente:
  - Host: `localhost`
  - Porta: `27017`
  - Usuário: `orion_admin`
  - Senha: `orion_admin_pass`
  - Authentication Database: `admin`

**String de conexão completa:**
```
mongodb://orion_admin:orion_admin_pass@localhost:27017/orion_posts_db?authSource=admin
```

### 📊 Consultas

Após conectar ao banco de dados, execute as seguintes consultas no `mongosh`:

**Trocar para o banco de dados:**
```javascript
use orion_posts_db
```

**Listar todos os posts:**
```javascript
db.posts.find() 
```

**Consultar posts com a tag "nosql":**
```javascript
db.posts.find({ tags: "nosql" })
```

**Consultar posts por autor:**
```javascript
db.posts.find({ autor: "Felipe Gomes" })
```

**Consultar posts com comentários de autor específico:**
```javascript
db.posts.find({ "comentarios.autor": "João Silva" })
```

### Limpeza e Reinicialização

Para refazer a inicialização do banco de dados (re-executar o script):

**Ambiente de Desenvolvimento:**
```bash
# Para containers (mantém dados)
docker compose -f docker-compose.dev.yml down 

# Para containers e remove volumes (apaga dados!)
docker compose -f docker-compose.dev.yml down -v 

# Inicia 
docker compose -f docker-compose.dev.yml up -d
```

**Ambiente de Produção:**
```bash
# Para containers (mantém dados)
docker compose -f docker-compose.prod.yml down 

# Para containers e remove volumes 
docker compose -f docker-compose.prod.yml down -v 

# Reconstrói e inicia
docker compose -f docker-compose.prod.yml up -d --build
```

## 🔍 Conceitos Aprendidos

### Consultas em Arrays
* `db.posts.find({ tags: "nosql" })` - Consulta valores dentro de arrays


### Consultas em Documentos Aninhados
* `db.posts.find({ "comentarios.autor": "João Silva" })` - Notação de ponto para acessar campos aninhados


### Filtros por Campos
* `db.posts.find({ autor: "Felipe Gomes" })` - Filtro por valor exato


### Update com updateOne()
* Adição dinâmica de campos a documentos existentes
* Operador `$set` para definir valores, incluindo arrays e documentos aninhados

### Diferenças entre SQL e NoSQL

* **Schema Flexível**: Documentos com estruturas diferentes na mesma coleção
* **Sem Joins**: Usa operadores de agregação ao invés de JOINs
* **Campos Dinâmicos**: Novos campos sem alterar a estrutura
* **Arrays Nativos**: Suporte nativo para arrays
* **Documentos Aninhados**: Estruturas hierárquicas complexas
* **Coleções vs Tabelas**: Usa coleções ao invés de tabelas

