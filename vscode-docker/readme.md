# Working with Code in [Docker](https://www.docker.com/) with [Visual Studio Code](https://code.visualstudio.com/)

## [Python](https://www.python.org/) and [Node.js](https://nodejs.org/en/)

[Python has various options to work with and debug projects](https://wiki.python.org/moin/PythonDebuggingTools), including a [Visual Studio debug library for Python](https://docs.microsoft.com/en-us/visualstudio/python/debugging-python-code-on-remote-linux-machines). [Node Inspector can be used to debug Node.js](https://nodejs.org/en/docs/guides/debugging-getting-started/) and [Node.js can be debugged with Chrome DevTools](https://medium.com/@paul_irish/debugging-node-js-nightlies-with-chrome-devtools-7c4a1b95ae27). 

Here is an example of working with Python and Node.js in Docker containers with Visual Studio Code (or [Code OSS](https://github.com/microsoft/vscode)), available for Windows, macOS, Linux and FreeBSD.

[Get and install Visual Studio Code](https://code.visualstudio.com/download), and the [VSCode Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python), the [VSCode Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker), the [VSCode Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack), the [VSCode Command Variable extension](https://marketplace.visualstudio.com/items?itemName=rioj7.command-variable) and the [VSCode EditorConfig extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

### Build and Test the Python and Node.js Project Docker Images

Get a Python project in Docker to work with, as an example [Photon](https://github.com/s0md3v/Photon). Because we want to be able to work with single Docker containers, as well as be able to orchestrate multiple containers with [Docker Compose](https://docs.docker.com/compose/), add two more projects to work with, [Striker](https://github.com/s0md3v/Striker) in a Docker container, and a simple container example of [Node-NMAP](https://www.npmjs.com/package/node-nmap).

```sh
git clone https://github.com/jackvz/Photon.git ./projects/Photon
git clone -b v1 https://github.com/jackvz/Striker.git ./projects/Striker
```

Build the Node.js Docker project image, and test it by running a container (with the `--rm` flag to remove it when done):

```sh
docker build -t node-nmap-demo . --progress plain
docker run --rm --name node-nmap-demo-1 node-nmap-demo bash -c "pnpm start '127.0.0.1 google.com'"
```

Build the Python Docker project images, and test it as containers:

```sh
docker build -t photon-app ./projects/Photon/ --progress plain
docker run --rm --name photon-app-1 photon-app bash -c "-u https://wired.com"
docker build -t striker-app ./projects/Striker/ --progress plain
docker run --rm --name striker-app-1 striker-app bash -c "https://wired.com"
```

Start the application stack, with the `-d` flag to run everything in the background:

```sh
docker-compose up -d
```

View the logs, with the `-f` flag to “follow” the log:

```sh
docker-compose logs -f
```

Clear the application stack by removing all containers and network(s), and add the `--volumes` flag to remove the volumes as well:

```sh
docker-compose down
```

### Working with Python 2 and 3 Code, and Node.js in Docker

@todo: Update this...

Add a VSCode launch configuration with a `.vscode/launch.json` file:

```
{
  "configurations": [
    {
      "name": "Docker: Python - General",
      "type": "docker",
      "request": "launch",
      "preLaunchTask": "docker-run: debug",
      "python": {
        "args": ["-u", "${input:promptURL}", "-o", "results"],
        "pathMappings": [
          {
            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/Photon"
          }
        ]
      }
    }
  ],
  "inputs": [
    {
      "id": "promptURL",
      "type": "command",
      "command": "extension.commandvariable.promptStringRemember",
      "args": {
        "key": "Args",
        "description": "Enter the URL to crawl.",
        "default": "google.com"
      }
    }
  ]
}
```

@todo: Update this...

Add VSCode tasks with a `.vscode/tasks.json` file:

```
{
  "version": "2.0.0",
  "tasks": [
    {
      "type": "docker-build",
      "label": "docker-build",
      "platform": "python",
      "dockerBuild": {
        "tag": "photon:latest",
        "dockerfile": "${workspaceFolder}/Dockerfile",
        "context": "${workspaceFolder}",
        "pull": true
      }
    },
    {
      "type": "docker-run",
      "label": "docker-run: debug",
      "dependsOn": ["docker-build"],
      "dockerRun": {
        "volumes": [
          {
            "containerPath": "/Photon", "localPath": "${workspaceFolder}"
          }
        ],
        "remove": true
      },
      "python": {
        "file": "photon.py",
        "args": ["${input:rememberArgs}"]
      }
    }
  ],
  "inputs": [
    {
      "id": "rememberArgs",
      "type": "command",
      "command": "extension.commandvariable.remember",
      "args": {
        "key": "Args"
      }
    }
  ]
}
```

### Analysing and Working with the Code

Once the configurations are added, open the folder as a workspace in Visual Studio Code and simply add breakpoints to the source code, and select `Run` and then `Start Debugging` from the menu.
