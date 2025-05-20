FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install --silent && npm cache clean --force

COPY . .

RUN npx prisma generate

EXPOSE 4000

ENTRYPOINT ["npm", "run", "dev"]
