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
│   ├── 04-insert-alunos.sql
│   └── consultas/
│       ├── consulta-2.1.sql
│       ├── consulta-2.2.sql
│       ├── consulta-extra.sql
│       ├── listar-alunos.sql
│       └── update-2.3.sql
├── imgs/
│   ├── ex2-extra-all-cursos.png
│   ├── ex2-extra.png
│   ├── ex2.1.png
│   ├── ex2.2.png
│   ├── ex2.3-sucess.png
│   ├── ex2.3.1.png
│   ├── ex2.3.2.png
│   └── ex2.3.3.png
├── docker-compose.yml
└── README.md
```

### 📝 Descrição dos Scripts

#### Scripts de Inicialização

Os scripts na raiz de `sql-scripts/` são executados automaticamente na primeira inicialização do container:

* **`01-create-table-cursos.sql`**: Cria a tabela `cursos` com as colunas `id` (chave primária auto-incremento) e `nome_curso`.
* **`02-create-table-alunos.sql`**: Cria a tabela `alunos` com as colunas `id` (chave primária), `nome`, `email` e `curso_id` (chave estrangeira referenciando `cursos.id`).
* **`03-insert-cursos.sql`**: Insere 6 cursos iniciais (Matemática, Português, Física, Inglês, Química, Educação física).
* **`04-insert-alunos.sql`**: Insere 8 alunos iniciais com suas respectivas referências aos cursos.

#### Scripts de Consultas

Os scripts na pasta `consultas/` são utilitários para consultas e atualizações no banco de dados:

* **`listar-alunos.sql`**: Lista todos os alunos cadastrados na tabela `alunos`.
* **`consulta-2.1.sql`**: Realiza um `INNER JOIN` entre as tabelas `alunos` e `cursos`, retornando o nome do aluno e o nome do curso.
* **`consulta-2.2.sql`**: Lista apenas os alunos que estão matriculados no curso de Matemática, utilizando `INNER JOIN` com filtro `WHERE`.
* **`update-2.3.sql`**: Atualiza o curso do aluno 'neymar' para 'Física', utilizando `UPDATE` com `JOIN`.
* **`consulta-extra.sql`**: Lista todos os cursos que não possuem alunos matriculados, utilizando `LEFT JOIN` com filtro `WHERE` para identificar registros nulos.

## 🔧 Bancos de Dados Orquestrados

O arquivo `docker-compose.yml` define dois serviços principais, interligados por uma rede customizada (`orion_network`), porém para esse exercício irei utilizar apenas o serviço `db_postgres`:

| Serviço | Tecnologia | Porta (Máquina:Container) | Volume de Dados |
| :--- | :--- | :--- | :--- |
| `db_postgres` | **PostgreSQL 16** | `5432:5432` | `postgres_data` |
| `db_mongo` | **MongoDB Latest** | `27017:27017` | `mongo_data` |

### 1. PostgreSQL (`db_postgres`)

* **Inicialização Automática:** O volume `- ./sql-scripts:/docker-entrypoint-initdb.d/` garante que todos os arquivos `.sql` e `.sh` na pasta `sql-scripts` sejam executados em ordem alfabética na **primeira** inicialização do container. **Nota:** Apenas os scripts na raiz de `sql-scripts/` são executados automaticamente. Os scripts na pasta `consultas/` devem ser executados manualmente quando necessário.

* **Ordem de Execução dos Scripts de Inicialização:**
    1. `01-create-table-cursos.sql` - Cria a tabela de cursos
    2. `02-create-table-alunos.sql` - Cria a tabela de alunos (com referência a cursos)
    3. `03-insert-cursos.sql` - Popula a tabela de cursos
    4. `04-insert-alunos.sql` - Popula a tabela de alunos

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

5. Conecte com as credenciais de acesso em um DBeaver/pgAdmin e utilize os scripts na pasta `consultas/`para realizar os testes. 

### Limpeza e Reinicialização

Se você precisar refazer a inicialização do banco de dados (re-executar os scripts SQL), use os seguintes comandos:

```bash
# 1. Para e remove os containers e a rede (mantém os dados)
docker compose down 

# 2. Para, remove os containers, a rede E OS VOLUMES DE DADOS persistidos (dados serão apagados!)
docker compose down -v 

# 3. Inicia o projeto novamente (forçando a execução dos scripts SQL)
docker compose up -d