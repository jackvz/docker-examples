# syntax=docker/dockerfile:1
FROM node:17-alpine
RUN apk add shadow sudo bash nmap
RUN echo "root:pass" | chpasswd
RUN echo "pass" | chsh -s /bin/bash root
RUN npm install -g pnpm
WORKDIR /app
COPY . .
RUN pnpm install --production
