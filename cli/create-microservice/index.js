const fs = require('fs')
const { resolve } = require('path')

const { validateName } = require('./lib/validate-name')
const { writeFileCI } = require('./lib/write-ci-files')
const { writeFileSrc } = require('./lib/write-src-files')
const { writeFileConfig } = require('./lib/write-config-files')
const { editConfigFilesSrc } = require('./lib/edit-config-files')
const { createSchemas } = require('./lib/create-schema')

const projectRootPath = resolve(__dirname, '../../')

let prefix = 'wb'

const createMicroservice = readline => {
  let name = null
  let choosenPrefix = false

  do {
    const input = readline.question(
      `
Choose a prefix for you service (default: ${prefix}):
`
    )

    if (input === '') {
      choosenPrefix = true
      break
    }

    if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input)) {
      choosenPrefix = true
      prefix = input
      break
    } else {
      console.log('Your prefix should be alphanumeric with dashes "-" (for separation)')
    }
  } while (!choosenPrefix)

  do {
    const chosenName = readline.question(
      `
Choose a name for you service:
`
    )

    name = validateName(prefix, chosenName)
  } while (!name)

  fs.mkdirSync(resolve(projectRootPath, `${prefix}-${name}`))

  writeFileCI(prefix, name)
  writeFileSrc(prefix, name)
  writeFileConfig(prefix, name)
  editConfigFilesSrc(prefix, name)
  createSchemas(prefix, name)
}

module.exports = { createMicroservice }
