# 🚀 Exercícios - Orion Bootcamp

Este repositório centraliza os exercícios práticos e projetos desenvolvidos durante o **Orion Bootcamp**. O conteúdo abrange desde fundamentos de banco de dados e containerização até orquestração de stacks complexas de IA e automação.

## 📂 Estrutura do Repositório

O projeto está organizado em quatro módulos principais:

### 1. 📊 [Banco de Dados](./banco-de-dados)
Exercícios focados em **SQL (PostgreSQL)** e **NoSQL (MongoDB)**, utilizando Docker Compose para facilitar o setup.

*   **ex001 & ex002**: Modelagem relacional, Foreign Keys, JOINs e consultas complexas no PostgreSQL.
*   **ex003 & ex004**: Introdução ao MongoDB, documentos, schemas flexíveis, arrays e documentos aninhados.

### 2. 🐳 [Docker](./docker)
Uma trilha progressiva para dominar **Docker** e **Docker Compose**, do básico ao avançado.

*   **Hello Container**: Criação de imagens e Dockerfile básico.
*   **API + DB**: Conexão entre serviços e persistência de dados.
*   **Boas Práticas**: Multi-stage builds e otimização de imagens (`dev` vs `prod`).
*   **Desafio Extra**: Orquestração completa de uma stack Node.js + Postgres + PgAdmin.

### 3. 🧠 [Flowise](./flowise)
Implementação de uma stack de Inteligência Artificial Low-Code.

*   **Stack**: FlowiseAI + Qdrant (Vector Database).
*   **Multi-Agentes**: Sistema conversacional avançado (`multi-Agents.json`) que integra múltiplos agentes especializados:
    *   **Agente Tecnológico**: Especialista em inovação, software e IA.
    *   **Agente de Saúde**: Especialista em orientações e dúvidas sobre saúde.
*   **Documentação**: [Acesse os documentos e prints no Google Drive](https://drive.google.com/drive/folders/1MSFQmuyM-Hp96yW-LXQ0X3t7LnRcl997?usp=drive_link).

### 4. 🤖 [n8n](./n8n)
Ambiente robusto de automação de fluxos de trabalho, integrando múltiplas ferramentas.

*   **Stack**:
    *   **n8n**: Ferramenta de automação de workflow.
    *   **PostgreSQL**: Banco de dados para o n8n.
    *   **Redis**: Gerenciamento de filas.
    *   **Evolution API**: Integração com WhatsApp.
*   **Workflows Incluídos** (`./n8n/workflow`):
    *   📦 **Gestão de Produtos**: Create, List, Edit, Delete (CRUD).
    *   💬 **Mensageria**: Receive msg, Send Text.
    *   🖼️ **Stickers**: Conversor e interpretador de stickers.
    *   🌐 **Web**: Start HTML.

