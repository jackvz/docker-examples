# Working with Code in [Docker](https://www.docker.com/) with [Visual Studio Code](https://code.visualstudio.com/)

## [Python](https://www.python.org/) 

[Python has various options to work with and debug projects](https://wiki.python.org/moin/PythonDebuggingTools), including a [Visual Studio debug library for Python](https://docs.microsoft.com/en-us/visualstudio/python/debugging-python-code-on-remote-linux-machines). Here is an example of working with Python in Docker with Visual Studio Code, available for Windows, macOS, Linux and FreeBSD.

[Get and install Visual Studio Code](https://code.visualstudio.com/download), and the [VSCode Python extension](https://marketplace.visualstudio.com/items?itemName=ms-python.python), the [VSCode Docker extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker), the [VSCode Command Variable extension](https://marketplace.visualstudio.com/items?itemName=rioj7.command-variable) and the [VSCode EditorConfig extension](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig).

Get a Python project in Docker to work with, as an example [Photon](https://github.com/s0md3v/Photon):

```sh
git clone https://github.com/jackvz/Photon.git
cd Photon
```

Add a `.vscode/tasks.json` file:

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

Add a `.vscode/launch.json` file:

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

Then just add breakpoints to the Python code in Visual Studio Code, and select `Run` and then `Start Debugging` from the menu.

Also see the [VSCode Remote Development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack).
