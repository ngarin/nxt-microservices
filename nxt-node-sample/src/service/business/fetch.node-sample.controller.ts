import logger from 'nxt-backend/dist/helpers/logger.helper'

import { NodeSampleController } from '@service/node-sample.controller'

class Fetch extends NodeSampleController {
  public async init(): Promise<{ msg: string }> {
    logger.info({
      manager: 'node-sample-business',
      handler: 'Fetch'
    })

    return { msg: 'ok' }
  }
}

export default new Fetch()
