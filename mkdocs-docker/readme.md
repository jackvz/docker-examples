# [MkDocs](https://www.mkdocs.org/) [Docker](https://www.docker.com/) Example

## App

Install [Python 3](https://www.python.org/downloads/), and the Python requirements:

```sh
pip3 install -r requirements.txt
```

Run the app:

```sh
mkdocs serve -a 0.0.0.0:8000
```

## Docker

Build and tag a development Docker image, optionally with the `--progress` flag set to `plain` to display more build info:

```sh
docker build --target dev --tag mkdocs-docker . --progress plain
docker tag mkdocs-docker:latest mkdocs-docker:dev
```

Build and tag a production Docker image:

```sh
docker build --tag mkdocs-docker .
docker tag mkdocs-docker:latest mkdocs-docker:v1.0.0
```

Run the development Docker image as a container, with the `-d` flag to run in the background, with the `-p` flag to publish a port, and with the `-c` flag specifying a command watching a file simply to keep the container running:

```sh
docker run -d -p 8000:8000 --name mkdocs-docker-dev mkdocs-docker:dev sh -c "mkdocs serve -a 0.0.0.0:8000 && tail -f /dev/null"
```

Browse to the site: [http://localhost:8000/](http://localhost:8000/). Note: If you are on Windows with WSL, you may have to [configure accessing network applications with WSL](https://docs.microsoft.com/en-us/windows/wsl/networking).

Now you can update the MkDocs source files at [docs/](./docs/) and see the changes to the site in your browser.

Stop and remove the development container:

```sh
docker stop mkdocs-docker-dev
docker rm mkdocs-docker-dev
```

Run the production Docker image as a container:

```sh
docker run -d -p 8000:80 --name mkdocs-docker-prod mkdocs-docker:v1.0.0
```

Browse to the site: [http://localhost:8000/](http://localhost:8000/)

Stop and remove the production container:

```sh
docker stop mkdocs-docker-prod
docker rm mkdocs-docker-prod
```

Remove all Docker images:

```sh
docker image rm mkdocs-docker
docker image rm mkdocs-docker:dev
docker image rm mkdocs-docker:v1.0.0
```

## Docker Compose

Start the application stack, with the `-d` flag to run everything in the background, and the `--env-file` flag to set up a development build environment:

```sh
docker-compose --env-file .env.dev up -d
```

Remove the application stack's containers, and build and start the stack again, but this time for a production environment, without specifying an environment config file so that the default environment settings are read from the `.env` file:

```sh
docker-compose down
docker-compose up -d --build
```

View the logs, with the `-f` flag to “follow” the log:

```sh
docker-compose logs -f
```

Remove the application stack's containers and the stack's image:

```sh
docker-compose down
docker image rm mkdocs-docker_docs
```

## Docker Network Troubleshooting

For Docker network troubleshooting, see [netshoot](https://github.com/nicolaka/netshoot).
