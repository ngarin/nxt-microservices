const fileContent = `import { NextFunction, Request, Response } from 'express'

import logger from 'nxt-backend/dist/helpers/logger.helper'

import HelloWorld{{serviceNameUpperCamel}} from '@service/business/{{serviceName}}.controller'

export async function handleHelloWorld{{serviceNameUpperCamel}}(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info({
      service: '{{serviceName}}',
      handler: 'handleHelloWorld{{serviceNameUpperCamel}}'
    })

    const { name } = req.body

    const results = await HelloWorld{{serviceNameUpperCamel}}.init(name)

    res.send(results)
  } catch (err) {
    next(err)
  }
}`

module.exports = { fileContent }
