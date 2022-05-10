# [Node.js](https://nodejs.org/en/) [Docker](https://www.docker.com/) Example

## Docker Compose

Start the application stack, with the `-d` flag to run everything in the background:

```sh
docker-compose up -d
```

View the logs, with the `-f` flag to “follow” the log:

```sh
docker-compose logs -f
```

Wait for the database and web server to start up, and then browse to the site: [http://localhost:3000/](http://localhost:3000/)

Remove the system's containers and network(s), and add the `--volumes` flag to remove the volumes as well:

```sh
docker-compose down
```
