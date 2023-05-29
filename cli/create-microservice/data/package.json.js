const fileContent = `{
  "name": "{{serviceName}}",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "requires": true,
  "scripts": {
    "test": "echo \\"Error: no test specified\\" && exit 1",
    "build": "cd ../nxt-shared && npm run build && cd ../nxt-backend && npm run build && cd ../{{serviceName}} && tsc",
    "serve": "node ./dist/index.js",
    "start": "nodemon --legacy-watch"
  },
  "author": "Nicolas GARIN",
  "license": "ISC",
  "_moduleAliases": {
    "@service": "dist/service"
  },
  "dependencies": {
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "joi": "^17.9.2",
    "module-alias": "^2.2.2",
    "mongoose": "5.10.13",
    "typescript": "^5.0.4"
  },
  "devDependencies": {
    "@types/express": "^4.17.17",
    "@types/hapi__joi": "^16.0.12",
    "@types/mongoose": "5.7.37",
    "nodemon": "^2.0.2"
  }
}`

module.exports = { fileContent }
