# Container Demo

## Install Podman/Docker

Before you can run a container in your local workstation you need to install either Podman or Docker below shows how to install them in RHEL/Fedora based system

### Installing Podman

Podman is included in the container-tools module, we need to enable that module first.

```bash
sudo yum module enable -y container-tools:rhel8
```

After enabling the module we can install it.

```bash
sudo yum module install -y container-tools:rhel8
```

To check installation and its version use these command.

```bash
podman

podman --version
```

> **Note**
>
> For other operating system please refer to this documentation from official podman website
>
> [Podman Installation Instructions](https://podman.io/getting-started/installation)

### Installing Docker

Add docker repository to your package manager using yum-utils. you need to add yum-utils first.

```bash
 sudo yum install -y yum-utils

 sudo yum-config-manager --add-repo https://download.docker.com/linux/rhel/docker-ce.repo
```

Install Docker and its tools

```bash
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

After installation successful start docker and check it using command below.

```bash
sudo systemctl start docker

docker

docker --version
```

> **Note**
>
> For other operating system please refer to this documentation from official docker website
>
> [Install Docker Engine](https://docs.docker.com/engine/install/)

## Using Podman and Docker

### Creating Containers

The podman run command creates a new container from an image and starts a process inside the new container.

```bash
podman run registry.redhat.io/rhel8/httpd-24

#output
Trying to pull registry.redhat.io/rhel8/httpd-24...
Getting image source signatures
Copying blob sha256:23113...b0be82
72.21 MB / 72.21 MB [======================================================] 7s
...output omitted…
AH00094: Command line: 'httpd -D FOREGROUND'
^C
```

The podman ps command displays the container ID and names for all actively running containers.

```bash
podman ps

#output
CONTAINER ID    IMAGE                              COMMAND              ...  NAMES
47c9aad6049  registry.redhat.io/rhel8/httpd-24  "/usr/bin/run-http..."  ...  focused_fermat

```

To define the container name explicitly, use the --name option when running a container.

```bash
podman run --name my-httpd-container registry.redhat.io/rhel8/httpd-24
```

You can run container and interact with it using –it flag as shown by example below.

```bash
podman run -it registry.redhat.io/rhel8/httpd-24 /bin/bash
```

`-it` flag use for Allocate a pseudo-TTY and keep terminal open also notice `/bin/bash` as entry point.

### Running Commands in a Container

The podman exec command starts an additional process inside an already running container.

```bash
podman exec my-httpd-container cat /etc/hostname

#output
7ed6e671a600
```

Executing bash command inside the existing container also can be achieve by using exec followed by `-it` command as shown below.

```bash
podman exec -it my-httpd-container /bin/bash
```

### Managing Containers

podman and docker can list container created on your system using `ps` command, `ps` command only list running container to list stopped container add –a flag to view all container.

```bash
podman ps

#output
CONTAINER ID  IMAGE                              COMMAND                CREATED  STATUS   PORTS    NAMES
77d4b7b8ed1f  registry.redhat.io/rhel8/httpd-24  "/usr/bin/run-http..."  ...ago  Up...             my-htt…
```

To stop a container, you can either use `stop` or `kill` subcommand.

```bash
podman stop my-httpd-container

podman kill my-httpd-container
```

Restarting container can be done with `restart` sub command, and to remove container can be done using `rm`

```bash
podman restart my-httpd-container

# removing-container
podman rm my-httpd-container
```

## Persistent Storage in Containers

There's some prerequisite to be meet before mounting host directory to a containers

- [ ] Correct File or Directory ownership to uid  and gid
- [ ] Directory is configured with correct SELinux context

```bash
mkdir /home/student/dbfiles

podman unshare chown -R 27:27 /home/student/dbfiles

sudo semanage fcontext -a -t container_file_t `/home/student/dbfiles(/.*)?`

sudo restorecon -Rv /home/student/dbfiles
```

Podman run below shows command to run mysql container and mount file inside `/var/lib/mysql` In the container to `/home/student/dbfiles` inside the host.

```bash
podman run -v /home/student/dbfiles:/var/lib/mysql rhmap47/mysql
```

## Accessing Containers from Network

Use the `-p [<IP address>:][<host port>:]<container port>` option with the podman run command to create an externally accessible container.

```bash
podman run -d --name apache1 -p 8080:80 registry.redhat.io/rhel8/httpd-24

podman run -d --name apache2 -p 127.0.0.1:8081:80 registry.redhat.io/rhel8/httpd-24

podman run -d --name apache3 -p 127.0.0.1::80 registry.redhat.io/rhel8/httpd-24
podman port apache3

# output
80/tcp -> 127.0.0.1:35134

podman run -d --name apache4 -p 80 registry.redhat.io/rhel8/httpd-24
podman port apache4

# output
80/tcp -> 0.0.0.0:37068
```

Example 1 any request to host port 8080 will be forwarded to port 80 in container.

Example 2 Only request from localhost port 8081 will be forwarded to container port 80.

Example 3 if theres no specified port in host Podman will allocate random port to forward it to container port 80, to see port forwarded use `podman port` command, The same thing on Example 4.
