# Base comum
FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./

# Camada de dependências para produção 
FROM base AS deps-prod
COPY package*.json ./
RUN npm ci --only=production

# Camada de dependências para desenvolvimento 
FROM node:18-alpine AS deps-dev
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci

# Imagem de desenvolvimento
FROM node:18-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .    
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Imagem de produção
FROM base AS prod
ENV NODE_ENV=production

COPY --from=deps-prod /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src
EXPOSE 3000

CMD ["node", "src/index.js"]


