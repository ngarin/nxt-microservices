const fileContent = `FROM node:18.14.0-alpine

WORKDIR /usr/src/{{serviceName}}

## Variables
##############

ENV NODE_ENV="production"

# Mongodb
ENV MONGO_PROTOCOL={{MONGO_PROTOCOL}}
ENV MONGO_HOST={{MONGO_HOST}}
ENV MONGO_USER={{MONGO_USER}}
ENV MONGO_DB={{MONGO_DB}}
ENV MONGO_PWD={{MONGO_PWD}}
ENV MONGO_AUTH_SOURCE={{MONGO_AUTH_SOURCE}}

COPY ./{{serviceName}}/ /usr/src/{{serviceName}}/
COPY ./backend/ /usr/src/backend/
COPY ./shared/ /usr/src/shared/

RUN cd ../shared && npm ci && npm link
RUN cd ../backend && npm ci && npm link && npm link shared
RUN cd ../{{serviceName}} && npm ci && npm link backend && npm link shared

EXPOSE 8080

CMD ["npm", "run", "serve"]`

module.exports = { fileContent }
