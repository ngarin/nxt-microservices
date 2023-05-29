const fs = require('fs')
const { resolve } = require('path')

const projectRootPath = resolve(__dirname, '../../../')
const currentPortPath = resolve(__dirname, '../data/current-port.txt')

const { fileContent: envFileContent } = require('../data/.env.sample.js')
const { fileContent: gitignoreFileContent } = require('../data/.gitignore')
const { fileContent: dockerignoreFileContent } = require('../data/.dockerignore')
const { fileContent: dockerfileFileContent } = require('../data/Dockerfile')
const { fileContent: dockerfileDevFileContent } = require('../data/Dockerfile.dev')
const { fileContent: nodemonFileContent } = require('../data/nodemon.json')
const { fileContent: packageFileContent } = require('../data/package.json')
const { fileContent: tsconfigFileContent } = require('../data/tsconfig.json')
const { fileContent: buildDockerfileFileContent } = require('../data/build_dockerfile.sh')
const currentPort = parseInt(fs.readFileSync(currentPortPath, 'utf8'))

const writeFileConfig = (prefix, name) => {
  const servicePath = resolve(projectRootPath, `${prefix}-${name}`)

  fs.writeFileSync(resolve(servicePath, '.env'), envFileContent)

  fs.writeFileSync(resolve(servicePath, '.dockerignore'), dockerignoreFileContent)

  fs.writeFileSync(resolve(servicePath, '.gitignore'), gitignoreFileContent)

  fs.writeFileSync(
    resolve(servicePath, 'Dockerfile'),
    dockerfileFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`)
  )

  fs.writeFileSync(
    resolve(servicePath, 'Dockerfile.dev'),
    dockerfileDevFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`).replace('{{port}}', currentPort + 1)
  )

  fs.writeFileSync(resolve(servicePath, 'nodemon.json'), nodemonFileContent)

  fs.writeFileSync(
    resolve(servicePath, 'package.json'),
    packageFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`)
  )

  fs.writeFileSync(resolve(servicePath, 'tsconfig.json'), tsconfigFileContent)

  fs.writeFileSync(resolve(servicePath, 'build_dockerfile.sh'), buildDockerfileFileContent)
}

module.exports = { writeFileConfig }
