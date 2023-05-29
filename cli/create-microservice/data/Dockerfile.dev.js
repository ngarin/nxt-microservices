const fileContent = `FROM node:18.14.0-alpine

WORKDIR /usr/src/{{serviceName}}

EXPOSE {{port}}

CMD ["npm", "start"]`

module.exports = { fileContent }
