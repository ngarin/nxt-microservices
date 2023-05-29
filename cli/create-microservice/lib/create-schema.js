const fs = require('fs')
const { resolve } = require('path')

const projectRootPath = resolve(__dirname, '../../../')
const { getFirstCharUpper } = require('../helpers/get-first-char-upper')

const createSchemas = (prefix, name) => {
  const nameCamel = name
    .split('-')
    .map(part => getFirstCharUpper(part))
    .join('')

  const schemaContent = `import { Schema } from 'mongoose'
  
  export const ${nameCamel}Schema: Schema = new Schema({
    hello: {
      type: String,
      trim: true,
      default: 'Hello world'
    }
  })
`

  fs.writeFileSync(resolve(resolve(projectRootPath, `nxt-shared/dist/schemas/${name}.schema.ts`)), schemaContent)

  fs.writeFileSync(
    resolve(resolve(projectRootPath, `nxt-shared/src/types/${name}.interface.ts`)),
    `export interface I${nameCamel} {
      _id?: string
      hello: string
    }
`
  )
}

module.exports = { createSchemas }
