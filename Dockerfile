FROM node:22-alpine

RUN apk --no-cache add git

WORKDIR /app

COPY package.json .

RUN npm install --force

COPY . .
