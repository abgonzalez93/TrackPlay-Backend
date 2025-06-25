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
COPY prisma ./prisma
COPY src ./src

# Genera Prisma Client
RUN npm run prisma:generate

# Aplica migraciones + ejecuta dev
CMD sh -c "npm run prisma:migrate && npm run dev"
