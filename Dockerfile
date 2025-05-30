# Imagen base con Node.js 24 (slim para menor tamaño)
FROM node:24.0-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia el .npmrc si usas registro privado
COPY .npmrc .npmrc

# Copia archivos de dependencias
COPY package*.json ./

# Copia el resto del código
COPY . .

# Instala herramientas necesarias
RUN apt update && apt install -y git curl

# Instala herramienta global npm-check-updates (ncu)
RUN npm install -g npm-check-updates

# Instala dependencias del proyecto
RUN npm install --silent && npm cache clean --force

# Ejecuta prisma generate si aplica
RUN npm run prisma:generate

# Comando por defecto
CMD ["npm", "run", "dev"]
