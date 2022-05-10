# Working with Code in [Docker](https://www.docker.com/) with [CodeLite](https://codelite.org/)

## [Python](https://www.python.org/) 

[Python has various options to work with and debug projects.](https://wiki.python.org/moin/PythonDebuggingTools) Here is an example of working with Python in Docker with CodeLite, available for Windows, macOS, Linux and FreeBSD.

[Get and install CodeLite](https://downloads.codelite.org/), and from the `Plugins` menu enable the [Language Server CodeLite plugin](https://wiki.codelite.org/pmwiki.php/Main/LanguageServer), the [Git CodeLite plugin](https://docs.codelite.org/plugins/git/), the [Docker CodeLite plugin](https://github.com/eranif/codelite/tree/master/Docker) and the [Remoty CodeLite plugin](https://docs.codelite.org/plugins/remoty/).

[Get and install Python](https://www.python.org/downloads/), and install [Jedi Language Server](https://github.com/pappasam/jedi-language-server):

```sh
pip install jedi-language-server
```

Get a Python project in Docker to work with, as an example [Photon](https://github.com/s0md3v/Photon), and then build the Docker image, and run the image as a Docker container, with the `-d` flag to run in the background, with the `-p` flag to publish the SSH port, and with the `-c` flag specifying a command watching a file simply to keep the container running, install and start SSH for the Alipine Linux system and set the root password, get the container's IP address, and SSH into the container to make sure that SSH works:

```sh
git clone https://github.com/jackvz/Photon.git
cd Photon
docker build -t photon .
docker run -d -it --entrypoint /bin/sh -p 7655:22 --name photon-1 photon:latest -c "tail -f /dev/null"
docker exec -it photon-1 /bin/sh -c "apk add openrc openssh && ssh-keygen -A \
    && echo -e 'PasswordAuthentication yes' >> /etc/ssh/sshd_config && echo -e 'PermitRootLogin yes' >> /etc/ssh/sshd_config && mkdir -p /run/openrc && touch /run/openrc/softlevel && rc-update add sshd && rc-service sshd start && rc-status && echo 'root:alpine' | chpasswd"
docker inspect photon-1 | grep IPAddress
ssh root@localhost -p 7655
```

```sh
docker exec -it photon-1 bash
```

In CodeLite, add a new workspace and select `Remote over SSH` as type. Enter the details and configure the language server, and you're all set up!

When done, stop and remove the container, and remove the image:

```sh
docker stop photon-1
docker rm photon-1
docker image rm photon
```
