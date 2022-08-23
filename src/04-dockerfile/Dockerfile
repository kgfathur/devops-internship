FROM nginx:1.22.0-alpine

LABEL MAINTAINER='pewpewtron'
LABEL TEAM="kelompok3"

RUN apk -U upgrade

COPY --chown=nginx:nginx index.html /usr/share/nginx/html/

COPY entrypoint.sh /etc/
RUN chmod +x /etc/entrypoint.sh

EXPOSE 80
ENTRYPOINT [ "/etc/entrypoint.sh" ]