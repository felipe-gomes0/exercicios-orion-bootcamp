# Base comum
FROM node:18-alpine AS base
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./

# Camada de dependências para desenvolvimento (
FROM node:18-alpine AS deps-dev
WORKDIR /app
ENV NODE_ENV=development
COPY package*.json ./
RUN npm ci


FROM node:18-alpine AS dev
WORKDIR /app
ENV NODE_ENV=development
COPY --from=deps-dev /app/node_modules ./node_modules
COPY . .    
EXPOSE 3000
CMD ["npm", "run", "dev"]

