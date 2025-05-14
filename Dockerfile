FROM node:latest

RUN useradd -ms /bin/bash -u 1001 app
USER app

WORKDIR /app

COPY --chown=app:app package*.json ./
RUN npm install --silent && npm cache clean --force

COPY --chown=app:app . .

EXPOSE 4000

ENTRYPOINT ["npm", "run", "dev"]

