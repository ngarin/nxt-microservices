const fs = require('fs')
const { resolve } = require('path')

const projectRootPath = resolve(__dirname, '../../../')
const currentPortPath = resolve(__dirname, '../data/current-port.txt')

const { fileContent: buildCIFileContent } = require('../data/ci/.build-ci.yml.js')
const { fileContent: deployCIFileContent } = require('../data/ci/.deploy-ci.yml.js')
const { fileContent: prepareDockerfileCIFileContent } = require('../data/ci/.prepare_dockerfile-ci.yml.js')
const { fileContent: testsCIFileContent } = require('../data/ci/.tests-ci.yml.js')
const { fileContent: zipCIFileContent } = require('../data/ci/.zip-ci.yml.js')
const { fileContent: gitlabCIFileContent } = require('../data/.gitlab-ci.yml.js')
const currentPort = parseInt(fs.readFileSync(currentPortPath, 'utf8'))

const writeFileCI = (prefix, name) => {
  fs.mkdirSync(resolve(resolve(projectRootPath, `${prefix}-${name}`), 'ci'))

  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), 'ci/.build-ci.yml'),
    buildCIFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`)
  )
  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), 'ci/.deploy-ci.yml'),
    deployCIFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`).replace(/{{port}}/g, currentPort + 1)
  )
  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), 'ci/.prepare_dockerfile-ci.yml'),
    prepareDockerfileCIFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`)
  )
  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), 'ci/.tests-ci.yml'),
    testsCIFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`)
  )
  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), 'ci/.zip-ci.yml'),
    zipCIFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`)
  )
  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), '.gitlab-ci.yml'),
    gitlabCIFileContent.replace(/{{serviceName}}/g, `${prefix}-${name}`)
  )
}

module.exports = { writeFileCI }
