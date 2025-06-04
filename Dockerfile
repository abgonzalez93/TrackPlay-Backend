# Imagen base ligera
FROM node:24.0-slim

# Crea carpeta de trabajo
WORKDIR /app

# Instala herramientas básicas
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends openssl && \
    rm -rf /var/lib/apt/lists/*

# Copia solo lo necesario para instalar dependencias
COPY package.json package-lock.json .npmrc* ./
RUN npm ci --silent && \
    npm cache clean --force && \
    rm -f .npmrc

# Copia configuraciones necesarias
COPY tsconfig.json ./

# Copia sólo el código fuente y prisma
COPY prisma ./prisma
COPY src ./src

# Genera Prisma
RUN npm run prisma:generate

# Comando de arranque en desarrollo
CMD ["npm", "run", "dev"]
