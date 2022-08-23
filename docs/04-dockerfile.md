# Dockerfile

## What is Dockerfile

Dockerfile/Containerfiles are another option for creating container images that addresses limitations such image size, and repeatable. Dockerfile/Containerfiles are easy to share, version control, reuse, and extend.

Why using Dockerfile/Containerfile

1. Add new runtime libraries, such as database connectors.
2. Include organization-wide customization such as SSL certificates and authentication providers.
3. Add internal libraries to be used by multiple container images for different applications.
4. Trim the container image by removing unused material (such as man pages, or documentation found in /usr/share/doc).
5. Lock either the parent image or some included software package to a specific release to lower risk related to future software updates.

## Building Custom Container Images

A Containerfile is a mechanism to automate the building of container images. Building an image from a Containerfile is a three-step process.

1. Create a working directory
2. Write the Containerfile
3. Build the image with Podman

A Containerfile is a text file named either Containerfile or Dockerfile that contains the instructions needed to build the image.

```Dockerfile
# This is a comment line 
FROM ubi8/ubi:8.5
LABEL description= "This is a custom httpd container image“
MAINTAINER John Doe jdoe@xyz.com
RUN yum install -y httpd
ENV LogLevel "info"
ADD http://someserver.com/filename.pdf /var/www/html
COPY ./src/ /var/www/html/
USER apache
EXPOSE 80
ENTRYPOINT ["/usr/sbin/httpd"]
CMD ["-D", "FOREGROUND"]
```

1. Lines that begin with a hash, or pound, sign (#) are comments.
2. The FROM instruction declares that the new container image extends ubi8/ubi:8.5 container base image.
3. The LABEL is responsible for adding generic metadata to an image. A LABEL is a simple keyvalue pair.
4. RUN executes commands in a new layer on top of the current image. The shell that is used to execute commands is /bin/sh.
5. ENV is responsible for defining environment variables that are available in the container. You can declare multiple ENV instructions within the Containerfile. You can use the env command inside the container to view each of the environment variables.
6. ADD instruction copies files or folders from a local or remote source and adds them to the container's file system. If used to copy local files, those must be in the working directory. ADD instruction unpacks local .tar files to the destination image directory.
7. COPY copies files from the working directory and adds them to the container's file system. It is not possible to copy a remote file using its URL with this Containerfile instruction.
8. USER specifies the username or the UID to use when running the container image for the RUN, CMD, and ENTRYPOINT instructions. It is a good practice to define a different user other than root for security reasons.
9. EXPOSE indicates that the container listens on the specified network port at runtime. The EXPOSE instruction defines metadata only; it does not make ports accessible from the host. The -p option in the podman run command exposes container ports from the host,
10. ENTRYPOINT specifies the default command to execute when the image runs in a container. If omitted, the default ENTRYPOINT is /bin/sh -c.
11. CMD provides the default arguments for the ENTRYPOINT instruction. If the default ENTRYPOINT applies (/bin/sh -c), then CMD forms an executable command and parameters that run at container start.

## Building Images

```bash
docker build -t intern-image:0.01 .
podman build -t intern-image:0.01 .
```

```bash
docker build -t intern-image:0.01 -f Docker/Dockerfile .
podman build -t intern-image:0.01 -f Docker/Dockerfile .
```

## Task

- [ ] Create a repository on you scm of choice containing a simple project
- [ ] Create a image from repository you created above, and run it as a container. 
