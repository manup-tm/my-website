FROM httpd:2.4
WORKDIR /usr/local/apache2/htdocs
COPY . .
EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]
CMD ["httpd-foreground"]
