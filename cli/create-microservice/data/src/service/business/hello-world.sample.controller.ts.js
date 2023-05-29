const fileContent = `import logger from 'nxt-backend/dist/helpers/logger.helper'

import { {{serviceNameUpperCamel}}Controller } from '@service/{{serviceName}}.controller'

class HelloWorld{{serviceNameUpperCamel}} extends {{serviceNameUpperCamel}}Controller {
  public async init(name: string): Promise<any> {
    logger.info({
      manager: '{{serviceName}}-business',
      handler: 'HelloWorld{{serviceNameUpperCamel}}',
      name
    })

    return { message: 'Hello world!' }
  }
}

export default new HelloWorld{{serviceNameUpperCamel}}()`

module.exports = { fileContent }
