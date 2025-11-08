# Dockerfile para ambiente de produção
# Imagem otimizada com script de inicialização incorporado
FROM mongo:latest

# Define variáveis de ambiente
ENV MONGO_INITDB_ROOT_USERNAME=orion_admin
ENV MONGO_INITDB_ROOT_PASSWORD=orion_admin_pass

# Copia o script de inicialização para o diretório de inicialização do MongoDB
# Este diretório é executado automaticamente na primeira inicialização
COPY db/init-schema.js /docker-entrypoint-initdb.d/init-schema.js

# Expõe a porta do MongoDB
EXPOSE 27017

