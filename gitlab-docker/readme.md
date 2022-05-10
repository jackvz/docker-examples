# [GitLab](https://about.gitlab.com/) [Docker](https://www.docker.com/) Example

Run a [GitLab Community Edition Docker](https://hub.docker.com/r/gitlab/gitlab-ce) instance with three [GitLab Runner Docker](https://hub.docker.com/r/gitlab/gitlab-runner) instances.

## Source

The [GitLab Community Edition Docker source code](https://github.com/jackvz/omnibus-gitlab/tree/main/docker) is from the GitLab [Omnibus](https://github.com/chef/omnibus) repo, and it pulls in resources from the [GitLab package](https://github.com/jackvz/omnibus-gitlab/blob/main/doc/build/build_package.md), from the [GitLab Community Edition source](https://github.com/jackvz/gitlab-foss), when [installing the GitLab Docker stack](https://docs.gitlab.com/ee/install/docker.html#install-gitlab-using-docker-compose).

[GitLab can be built as an all-in-one GitLab Docker image](https://github.com/jackvz/omnibus-gitlab/blob/main/doc/build/build_docker_image.md#building-an-all-in-one-gitlab-docker-image-locally) or [GitLab can be built as individual Docker images for each GitLab component](https://gitlab.com/gitlab-org/build/CNG). Here we will pull in the all-in-one image.

## Start the Application Stack

Start the application stack, with the `-d` flag to run everything in the background:

```sh
docker-compose up -d
```

View the logs, with the `-f` flag to "follow" the log:

```sh
docker-compose logs -f
```

Wait for the stack to start up, and when it's running, cancel out of the logs (Ctrl+C) and configure the installation. Set the root password.

```sh
docker exec -it gitlab-docker_gitlab_1 gitlab-rake "gitlab:password:reset[root]"
```

For more, see [GitLab Rake tasks](https://docs.gitlab.com/ee/raketasks/).

Browse to the site: [http://localhost/](http://localhost/), and log in.

## Activate the Container Registry

Enable the container registry feature:

```sh
docker exec -it gitlab-docker_gitlab_1 bash
apt update
apt install nano
nano /etc/gitlab/gitlab.rb
```

```
gitlab_rails['gitlab_default_projects_features_container_registry'] = true
...
gitlab_rails['registry_enabled'] = true
gitlab_rails['registry_host'] = "localhost"
gitlab_rails['registry_port'] = "5005"
gitlab_rails['registry_path'] = "/var/opt/gitlab/gitlab-rails/shared/registry"
...
registry['enable'] = true
registry['username'] = "registry"
registry['group'] = "registry"
registry['uid'] = nil
registry['gid'] = nil
registry['dir'] = "/var/opt/gitlab/registry"
registry['registry_http_addr'] = "localhost:5000"
registry['log_directory'] = "/var/log/gitlab/registry"
registry['env_directory'] = "/opt/gitlab/etc/registry/env"
...
registry_nginx['enable'] = true
registry_nginx['listen_port'] = 5005
```

```sh
gitlab-ctl reconfigure
```

```sh
nano /var/opt/gitlab/registry/config.yml
```

```
auth:
  token:
    realm: http://localhost/jwt/auth
```

```sh
gitlab-ctl restart
exit
```

## Clear the Application Stack

When you're done, remove the system's containers and network(s). To keep your local build artifact store's data, do not add the `--volumes` flag, and your data will stay stored in `/srv/gitlab`.

```sh
docker-compose down
```

## Use the Container Registry

Pull a [Docker](https://www.docker.com/) image from [Docker Hub](https://hub.docker.com/), create a GitLab access token at [http://localhost/-/profile/personal_access_tokens](http://localhost/-/profile/personal_access_tokens), create a GitLab project at [http://localhost/projects/new#blank_project](http://localhost/projects/new#blank_project) called `debian`, and log in with Docker using the access token, and push it to the local GitLab instance's container registry:

```sh
docker pull debian:latest
docker login http://localhost:5005
docker tag debian:latest localhost:5005/gitlab-instance-[identifier]/debian:latest
docker image push localhost:5005/gitlab-instance-[identifier]/debian:latest
```
