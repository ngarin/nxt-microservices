import { Request, Response, NextFunction } from 'express'

import logger from 'nxt-backend/dist/helpers/logger.helper'

import Fetch from '@service/business/fetch.node-sample.controller'

export async function handleFetch(req: Request, res: Response, next: NextFunction) {
  try {
    logger.info({
      service: 'node-sample',
      handler: 'handleFetch'
    })

    const results = await Fetch.init()

    res.send(results)
  } catch (err) {
    next(err)
  }
}
