FROM node:20.2.0-alpine

WORKDIR /usr/src/nxt-node-sample

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

# Mailjet
ENV MAILJET_APIKEY_PUBLIC={{MAILJET_APIKEY_PUBLIC}}
ENV MAILJET_APIKEY_PRIVATE={{MAILJET_APIKEY_PRIVATE}}

COPY ./nxt-node-sample/ /usr/src/nxt-node-sample/
COPY ./nxt-backend/ /usr/src/nxt-backend/
COPY ./nxt-shared/ /usr/src/nxt-shared/

RUN cd ../nxt-shared && npm ci && npm link
RUN cd ../nxt-backend && npm ci && npm link && npm link nxt-shared
RUN cd ../nxt-node-sample && npm ci && npm link nxt-backend && npm link nxt-shared

EXPOSE 8080

CMD ["npm", "run", "serve"]
