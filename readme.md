# [Docker](https://www.docker.com/) Examples

## Requirements

### Windows Requirements

- Just get [WSL](https://docs.microsoft.com/en-us/windows/wsl/install), and install a flavour of Linux like [Debian from the Microsoft store](https://apps.microsoft.com/store/detail/debian/9MSVKQC78PK6), and then use your containerised Linux system (you can open it from the Windows Start menu, and access its files by browsing to `\\wsl$\Debian`), while still having all your favourite Windows programs available.
- Install [Docker Destkop](https://docs.docker.com/desktop/windows/install/), and [enable Docker & WSL integration](https://docs.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers).
- Note: If you're having trouble connecting to the internet from the containerised Linux system, update `/etc/resolv.conf` with `nameserver=8.8.8.8`.

### macOS, Linux and FreeBSD Requirements

- Get [Docker engine](https://docs.docker.com/get-docker/) and install [Docker Compose](https://docs.docker.com/compose/install/).

## The Examples

- [MkDocs Example](./mkdocs-docker/readme.md)
- [Node.js Example](./node-docker/readme.md)
- [Python Example](./python-docker/readme.md)
- [GitLab Example](./gitlab-docker/readme.md)
- [VSCode Example](./vscode-docker/readme.md)
- [Sentry Example](./sentry-docker/readme.md)
- [NestJS Example](./nest-docker/readme.md)
- [HashiCorp Examples](./hashicorp-docker/readme.md)
