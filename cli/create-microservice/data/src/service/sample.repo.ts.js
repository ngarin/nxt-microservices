const fileContent = `import { {{serviceNameUpperCamel}}Schema } from 'nxt-shared/dist/schemas/{{serviceName}}.schema'
import { Repo } from 'nxt-backend/dist/helpers/repo.helper'

class {{serviceNameUpperCamel}}Repo extends Repo {}

export default new {{serviceNameUpperCamel}}Repo('{{serviceNameUpperCamel}}', {{serviceNameUpperCamel}}Schema, '{{serviceName}}')
`

module.exports = { fileContent }
