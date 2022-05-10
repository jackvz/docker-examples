# [Python](https://www.python.org/) [Docker](https://www.docker.com/) Example

## Build the App

Create the app, by getting the required Python packages and generating a requirements file, and by adding the `app.py` file:

```sh
pip3 install Flask
pip3 freeze | grep Flask >> requirements.txt
```

Start the app:

```sh
python3 -m flask run
```

## Containerise the App

Build a Docker image:

```sh
docker build --tag python-docker .
```

Tag the Docker image with a version number:

```sh
docker tag python-docker:latest python-docker:v1.0.0
```

If you are on Windows with WSL, you may have to [configure accessing network applications with WSL](https://docs.microsoft.com/en-us/windows/wsl/networking).

Run the Docker image as a container, with the `-d` flag to run in the background, with the `-p` flag to publish a port ,and with the `--name` flag to give the container a name:

```sh
docker run -d -p 5000:5000 --name python-rest-server python-docker
```

Browse to the site: [http://localhost:5000/](http://localhost:5000/)

Stop and remove the Docker container, and remove the Docker image:

```sh
docker stop python-rest-server
docker rm python-rest-server
docker image rm python-docker
docker image rm python-docker:v1.0.0
```
