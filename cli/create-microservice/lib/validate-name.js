const fs = require('fs')
const { resolve } = require('path')

const projectRootPath = resolve(__dirname, '../../../')

const validateName = (prefix, name) => {
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
    if (fs.existsSync(resolve(projectRootPath, `${prefix}-${name}`))) {
      console.log('\nthis is already taken')
    } else {
      return name
    }
  } else {
    console.log('Your name should be alphanumeric with dashes "-" for separation')
  }

  return null
}

module.exports = { validateName }
