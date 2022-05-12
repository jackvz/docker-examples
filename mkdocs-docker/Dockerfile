# syntax=docker/dockerfile:1

FROM python:alpine AS base
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

FROM base AS dev
COPY . .
CMD ["mkdocs", "serve", "-a", "0.0.0.0:8000"]

FROM base AS build
COPY . .
RUN mkdocs build

FROM nginx:alpine as prod
COPY --from=build /app/site /usr/share/nginx/html
