import { Response } from 'express'

import logger from './logger.helper'

export class ErrorHandler extends Error {
  constructor(public statusCode: number, message: any) {
    super()
    this.message = message
  }
}

export const handleError = (err: ErrorHandler, res: Response) => {
  const { statusCode = 500, message } = err

  res.status(statusCode).send({
    status: 'error',
    statusCode,
    message
  })

  logger.error(err)
}
