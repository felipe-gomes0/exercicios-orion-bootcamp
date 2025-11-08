# Exercício 2

Este projeto demonstra a orquestração e inicialização de um banco de dados SQL utilizando **Docker Compose**, garantindo que os dados e o esquema inicial sejam carregados automaticamente no primeiro boot do container.

## 📁 Estrutura do Projeto

O projeto é organizado da seguinte forma:

```
ex002-bootcamp/
├── sql-scripts/
│   ├── 01-create-table-cursos.sql
│   ├── 02-create-table-alunos.sql
│   ├── 03-insert-cursos.sql
│   └── 04-insert-alunos.sql
├── imgs/
│   └── (imagens de documentação e exemplos)
├── docker-compose.yml
└── README.md
```

A pasta `sql-scripts` contém todos os *scripts* SQL necessários para a inicialização e inserção de dados no banco de dados. A pasta `imgs` contém imagens de documentação e exemplos de uso.

## 🔧 Bancos de Dados Orquestrados

O arquivo `docker-compose.yml` define dois serviços principais, interligados por uma rede customizada (`orion_network`), porém para esse exercício irei utilizar apenas o serviço `db_postgres`:

| Serviço | Tecnologia | Porta (Máquina:Container) | Volume de Dados |
| :--- | :--- | :--- | :--- |
| `db_postgres` | **PostgreSQL 16** | `5432:5432` | `postgres_data` |
| `db_mongo` | **MongoDB Latest** | `27017:27017` | `mongo_data` |

### 1. PostgreSQL (`db_postgres`)

* **Inicialização Automática:** O volume `- ./sql-scripts:/docker-entrypoint-initdb.d/` garante que todos os arquivos `.sql` e `.sh` na pasta `sql-scripts` sejam executados em ordem alfabética na **primeira** inicialização do container.
* **Ordem de Execução e Conteúdo:**
    * `01-create-table-cursos.sql`: Cria a tabela `cursos` com as colunas:
        * `id` (INT, PRIMARY KEY, AUTO INCREMENT)
        * `nome_curso` (VARCHAR(255))
    * `02-create-table-alunos.sql`: Cria a tabela `alunos` com as colunas:
        * `id` (INT, PRIMARY KEY, AUTO INCREMENT)
        * `nome` (VARCHAR(255))
        * `email` (VARCHAR(255))
        * `curso_id` (INT, NOT NULL)
        * Inclui uma *Foreign Key* (`fk_alunos_cursos`) que referencia a tabela `cursos(id)`
    * `03-insert-cursos.sql`: Insere 6 cursos na tabela `cursos` (Matemática, Português, Física, Inglês, Química, Educação física)
    * `04-insert-alunos.sql`: Insere 8 alunos na tabela `alunos` com suas respectivas referências aos cursos
* **Credenciais de Acesso:**
    * **Usuário:** `orion_user`
    * **Senha:** `orion_password`
    * **Banco de Dados:** `orion_db`
    * **Porta:** `5432`


##  Como Inicializar o Projeto

1.  **Pré-requisito:** Certifique-se de ter o Docker e o Docker Compose instalados.
2.  Navegue até o diretório que contém o `docker-compose.yml`.
3.  Inicie os containers em modo *detached* (segundo plano):

    ```bash
    docker compose up -d
    ```

4.  O PostgreSQL será inicializado, executará os scripts SQL e estará pronto para uso. O MongoDB também estará ativo e configurado.

### Limpeza e Reinicialização

Se você precisar refazer a inicialização do banco de dados (re-executar os scripts SQL), use os seguintes comandos:

```bash
# 1. Para e remove os containers e a rede (mantém os dados)
docker compose down 

# 2. Para, remove os containers, a rede E OS VOLUMES DE DADOS persistidos (dados serão apagados!)
docker compose down -v 

# 3. Inicia o projeto novamente (forçando a execução dos scripts SQL)
docker compose up -d