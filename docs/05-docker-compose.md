# Docker Compose

## What is Docker Compose

Docker Compose is a tool that was developed to help define and share multi-container applications. With Compose, we can create a YAML file to define the services and with a single command, can spin everything up or tear it all down.

The big advantage of using Compose is you can define your application stack in a file, keep it at the root of your project repo (it’s now version controlled), and easily enable someone else to contribute to your project. Someone would only need to clone your repo and start the compose app.

## Basic syntax

Running a container in traditional way we usually using docker/podman cli as shown in example below.

```bash
docker run -dp 3000:3000 \
  -w /app -v "$(pwd):/app" \
  --network todo-app \
  -e MYSQL_HOST=mysql \
  -e MYSQL_USER=root \
  -e MYSQL_PASSWORD=secret \
  -e MYSQL_DB=todos \
  node:12-alpine \
  sh -c "yarn install && yarn run dev"
```

To define this container in a docker-compose we need to define defining the schema version. In most cases, it’s best to use the latest supported version. You can look at the [Compose file reference](https://docs.docker.com/compose/compose-file/) for the current schema versions and the compatibility matrix.

after defining schema version, we need to define service for our container, if your app consist of multiple container your compose file will look like this.

```docker-compose
version: "3.7"

service:
    frontend:

    backend:

    db:
```

To define container as shown in docker run command above we need to define it port, volume, environment variable, image, network, and entrypoint. the example below will resulting the same container as docker run command above

```docker-compose
services:
  app:
    image: node:12-alpine
    command: sh -c "yarn install && yarn run dev"
    ports:
      - 3000:3000
    working_dir: /app
    volumes:
      - ./:/app
    environment:
      MYSQL_HOST: mysql
      MYSQL_USER: root
      MYSQL_PASSWORD: secret
      MYSQL_DB: todos
    networks:
      - todo-app
```

Usually modern application need a database tu run its function, if you using docker run command. you need to execute 2 docker run command the first one as shown above to run your app and the one shown below to start the database container.

```docker-compose
docker run -d \
  --network todo-app --network-alias mysql \
  -v todo-mysql-data:/var/lib/mysql \
  -e MYSQL_ROOT_PASSWORD=secret \
  -e MYSQL_DATABASE=todos \
  mysql:5.7
```

Defining second container on docker-compose we need to start by the service name, the compose example above showing service named app, to define database we can use `db` or other name that easily identify our container.

```docker-compose
services:
  mysql:
    image: mysql:5.7
    volumes:
      - todo-mysql-data:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: todos
    networks:
      - todo-app
```

service above showing a mysql image will be used as the container where data inside `/var/lib/mysql` will be mounted on volumes named todo-mysql-data, then data for mysql such root password and database name define in environment variable. the database also using network called todo-app.
After 2 service is define we need to define volume or network our container will be using, example below shows sample of defined volume and network.

```docker-compose
volumes:
  todo-mysql-data:

networks:
  todo-app:
```

If you wish to create your own image during compose process you can define the service to build your app from a dockerfile located within your working directory.

```docker-compose
version: '3'
services:

  app:
    build:
      context: .
      dockerfile: Dockerfile
```

Example above showing a service named app will be build where context is used to define the location of your dockerfile `.` indicate dockerfile located on current working directory, a dockerfile will be called to build our app first then started as a container when build process is done.

```docker-compose
version: '3'
services:

  backend:
    build:
      context: backend
      target: builder
```

Another example, as shown above work the same but instead using dockerfile on ths sample will be using `target`, it defines the stage to build as defined inside a multi-stage Dockerfile.
