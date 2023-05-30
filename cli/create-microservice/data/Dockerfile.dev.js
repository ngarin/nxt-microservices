const fileContent = `FROM node:20.2.0-alpine

WORKDIR /usr/src/{{serviceName}}

EXPOSE {{port}}

CMD ["npm", "start"]`

module.exports = { fileContent }
