# 🐳 Exercícios de Docker — Orion Bootcamp  

Repositório desenvolvido como parte das atividades práticas do **Orion Bootcamp**, com foco em **Docker** e **Docker Compose**.  

O conteúdo reúne a evolução dos conceitos aprendidos nos módulos do documento **“Docker”**, organizados em etapas progressivas — desde a criação de uma imagem simples até a orquestração de uma stack completa com múltiplos serviços.  

---

## 📘 Conteúdo  

###  **Exercício 1 — Hello Container**
Criação de uma imagem customizada a partir de um **Dockerfile**, expondo uma aplicação simples via **Docker Compose**.  

**Objetivo:** compreender a estrutura básica de um container e o fluxo de build/run.  

---

###  **Exercício 2 — API + Banco de Dados**
Configuração de dois serviços conectados entre si (API e DB).  
- Uso de **variáveis de ambiente** para configurar credenciais.  
- Persistência de dados com **volumes nomeados**.  
- Comunicação interna via **rede do Docker Compose**.  

---

### **Exercício 3 — Boas Práticas e Ambientes**
Introdução ao conceito de **multi-stage builds** e separação de ambientes:
- `dev`: com volume montado e live reload.  
- `prod`: imagem otimizada e leve.  
**Objetivo:** adotar práticas profissionais de build e otimização de camadas.  

---

### **Desafio Extra — Stack Completa**
Desenvolvimento e orquestração de uma aplicação completa composta por:  
- **API Node.js (Express)** – construída via `Dockerfile`.  
- **PostgreSQL** – banco de dados com volume persistente e healthcheck.  
- **Pgadmin** – interface web de administração do banco.  

A stack é totalmente automatizada via `docker-compose.yml`, utilizando variáveis definidas em `.env`, rede nomeada e dependências configuradas com `depends_on` e `healthcheck`.  


