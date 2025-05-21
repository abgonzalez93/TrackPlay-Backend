# Imagen base
FROM node:latest

# Variables de entorno necesarias para nvm
ENV NVM_DIR=/root/.nvm
ENV NODE_VERSION=20

# Instala dependencias del sistema y configura nvm
RUN apt update && apt install -y curl git build-essential \
  && curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash \
  && . "$NVM_DIR/nvm.sh" \
  && nvm install $NODE_VERSION \
  && nvm use $NODE_VERSION \
  && nvm alias default $NODE_VERSION \
  && npm install -g npm

# Añade Node y NPM al PATH global
ENV PATH="$NVM_DIR/versions/node/v$NODE_VERSION/bin/:$PATH"

# Crea carpeta de trabajo
WORKDIR /app

# Copia los archivos del backend
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Genera Prisma
RUN npm run prisma:generate

# Expone el puerto del backend
EXPOSE 4000

# Comando de arranque
CMD ["npm", "run", "dev"]
