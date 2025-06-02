# Imagen base estable
FROM node:24.0-slim

# Crea carpeta de trabajo
WORKDIR /app

# Copia el .npmrc antes del npm install
COPY .npmrc .npmrc

# Copia archivos necesarios
COPY package*.json ./

# Luego copia el resto del código
COPY . .

# Actualiza npm y ncu sin instalar git ni build-essential
RUN apt update \
  && npm install -g npm \
  && npm install -g npm-check-updates \
  && apt clean && rm -rf /var/lib/apt/lists/*

# Instala dependencias en silencio
RUN npm install --silent && npm cache clean --force

# Genera Prisma
RUN npm run prisma:generate

# Comando de arranque
CMD ["npm", "run", "dev"]
