const fs = require('fs')
const { resolve } = require('path')

const projectRootPath = resolve(__dirname, '../../../')
const { getFirstCharUpper } = require('../helpers/get-first-char-upper')
const currentPortPath = resolve(__dirname, '../data/current-port.txt')

const { fileContent: indexFileContent } = require('../data/src/index.ts')
const currentPort = parseInt(fs.readFileSync(currentPortPath, 'utf8'))
const { fileContent: routeFileContent } = require('../data/src/service/sample.route.ts')
const { fileContent: repoFileContent } = require('../data/src/service/sample.repo.ts')
const { fileContent: handlerFileContent } = require('../data/src/service/sample.handler.ts')
const { fileContent: controllerFileContent } = require('../data/src/service/sample.controller.ts')
const { fileContent: helloWorldFileContent } = require('../data/src/service/business/hello-world.sample.controller.ts')

const writeFileSrc = (prefix, name) => {
  const nameCamel = name
    .split('-')
    .map((part, index) => (index === 0 ? part : getFirstCharUpper(part)))
    .join('')

  const nameUpperCamel = getFirstCharUpper(nameCamel)

  fs.mkdirSync(resolve(resolve(projectRootPath, `${prefix}-${name}`), 'src'))
  fs.mkdirSync(resolve(resolve(projectRootPath, `${prefix}-${name}`), 'src/service'))
  fs.mkdirSync(resolve(resolve(projectRootPath, `${prefix}-${name}`), 'src/service/business'))

  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), 'src/index.ts'),
    indexFileContent
      .replace(/{{serviceName}}/g, name)
      .replace(/{{serviceNameCamel}}/g, nameCamel)
      .replace('{{port}}', currentPort + 1)
  )

  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), `src/service/${name}.route.ts`),
    routeFileContent.replace(/{{serviceName}}/g, name).replace(/{{serviceNameUpperCamel}}/g, nameUpperCamel)
  )

  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), `src/service/${name}.repo.ts`),
    repoFileContent.replace(/{{serviceName}}/g, name).replace(/{{serviceNameUpperCamel}}/g, nameUpperCamel)
  )

  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), `src/service/${name}.handler.ts`),
    handlerFileContent.replace(/{{serviceName}}/g, name).replace(/{{serviceNameUpperCamel}}/g, nameUpperCamel)
  )

  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), `src/service/${name}.controller.ts`),
    controllerFileContent.replace(/{{serviceNameUpperCamel}}/g, nameUpperCamel)
  )

  fs.writeFileSync(
    resolve(resolve(projectRootPath, `${prefix}-${name}`), `src/service/business/${name}.controller.ts`),
    helloWorldFileContent.replace(/{{serviceName}}/g, name).replace(/{{serviceNameUpperCamel}}/g, nameUpperCamel)
  )
}

module.exports = { writeFileSrc }
