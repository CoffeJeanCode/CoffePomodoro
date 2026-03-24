FROM oven/bun:1.0.12-slim

RUN apt-get update  \
  && apt-get install -y \
  git \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .

RUN bun install

COPY . .
