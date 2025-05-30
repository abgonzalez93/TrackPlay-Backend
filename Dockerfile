# Imagen base estable
FROM node:24.0-slim

# Variables de entorno necesarias para nvm
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=20
ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin/:$PATH"

# Crea carpeta de trabajo
WORKDIR /app

# Copia el .npmrc antes del npm install
COPY .npmrc .npmrc

# Copia archivos necesarios
COPY package*.json ./

# Luego copia el resto del código
COPY . .

# Instala dependencias en silencio
RUN npm install --silent && npm cache clean --force

# Instala herramientas necesarias y configura nvm + global tools
RUN apt update && apt install -y curl git build-essential \
  && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
  && . "$NVM_DIR/nvm.sh" \
  && nvm install $NODE_VERSION \
  && nvm use $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && npm install -g npm \
  && npm install -g npm-check-updates

# Genera Prisma
RUN npm run prisma:generate

# Comando de arranque
CMD ["npm", "run", "dev"]
