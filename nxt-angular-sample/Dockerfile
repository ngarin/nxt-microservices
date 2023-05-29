FROM httpd:2.4-alpine

ENV NODE_ENV production

RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i 's#AllowOverride [Nn]one#AllowOverride All#' /usr/local/apache2/conf/httpd.conf

RUN rm -rf /usr/local/apache2/htdocs/*

COPY /dist /usr/local/apache2/htdocs

EXPOSE 80

CMD ["httpd-foreground"]
