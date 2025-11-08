# Exercícios de Banco de Dados - Orion Bootcamp

Este diretório contém exercícios práticos sobre bancos de dados relacionais (SQL) e não relacionais (NoSQL), utilizando Docker Compose para orquestração e inicialização automática.

## 📚 Estrutura dos Exercícios

### 📊 Exercício 1 - PostgreSQL Básico (`ex001-bootcamp`)

Introdução ao PostgreSQL com Docker Compose. Demonstra:
- Criação de tabelas relacionais (`cursos` e `alunos`)
- Definição de chaves estrangeiras (Foreign Keys)
- Inserção de dados iniciais
- Inicialização automática do banco via scripts SQL
---

### 🔍 Exercício 2 - Consultas SQL (`ex002-bootcamp`)

Avança no PostgreSQL com operações de consulta e atualização:
- Consultas com `INNER JOIN` entre tabelas
- Filtros com `WHERE`
- Atualização de dados com `UPDATE` e `JOIN`
- Consultas com `LEFT JOIN` para identificar registros órfãos
- Scripts de consultas para testes


---

### 🍃 Exercício 3 - MongoDB Básico (`ex003-bootcamp`)

Introdução ao MongoDB (NoSQL) com Docker Compose:
- Criação de banco de dados e coleções
- Inserção de documentos com estrutura flexível
- Demonstração de schema flexível (documentos diferentes na mesma coleção)
- Inicialização automática via scripts JavaScript

---

### 🚀 Exercício 4 - MongoDB Avançado (`ex004-bootcamp`)

MongoDB avançado com consultas complexas e ambientes separados:
- Consultas em arrays
- Consultas em documentos aninhados
- Uso de `updateOne()` para adicionar campos dinamicamente
- Ambientes de desenvolvimento e produção separados
- Dockerfiles otimizados para cada ambiente
- Scripts de consultas avançadas

## 🎯 Objetivos dos Exercícios

Os exercícios foram projetados para:

1. **Aprender SQL**: Compreender relacionamentos, JOINs e operações básicas em bancos relacionais
2. **Aprender NoSQL**: Explorar a flexibilidade de schemas e estruturas de documentos
3. **Docker Compose**: Orquestrar bancos de dados com inicialização automática
4. **Boas Práticas**: Separar ambientes de desenvolvimento e produção
5. **Consultas Complexas**: Trabalhar com arrays, documentos aninhados e filtros avançados

## 🔧 Pré-requisitos

- Docker instalado
- Docker Compose instalado
- Cliente PostgreSQL (opcional, para exercícios 1 e 2)
- MongoDB Compass ou mongosh (opcional, para exercícios 3 e 4)

## 📖 Como Usar

Cada exercício possui seu próprio README com instruções detalhadas. Navegue até a pasta do exercício desejado:

```bash
cd ex001-bootcamp  # ou ex002-bootcamp, ex003-bootcamp, ex004-bootcamp
```

Consulte o README.md de cada exercício para instruções específicas de inicialização e uso.

## 📝 Resumo dos Conceitos

| Exercício | Banco de Dados | Conceitos Principais |
|-----------|----------------|---------------------|
| 1 | PostgreSQL | Tabelas, Foreign Keys, Inserção de dados |
| 2 | PostgreSQL | JOINs, UPDATE, Consultas complexas |
| 3 | MongoDB | Coleções, Documentos, Schema flexível |
| 4 | MongoDB | Arrays, Documentos aninhados, Ambientes dev/prod |

