import { NextFunction, Request, Response } from 'express'
import { networkInterfaces } from 'os'
import ipRangeCheck from 'ip-range-check'
import { ErrorHandler } from './error-handler.helper'
import { EHttpStatusCodes } from 'nxt-shared/dist/enums/http-status-codes.enum'

export function ipRangeCheckMiddleware(req: Request, res: Response, next: NextFunction) {
  const cidrs: string[] = Object.values(networkInterfaces()).reduce((prev, curr) => {
    return [...prev, ...curr.map(c => c.cidr)]
  }, []) as string[]

  if (!ipRangeCheck(req.connection.remoteAddress, cidrs)) {
    throw new ErrorHandler(EHttpStatusCodes.forbidden, 'Forbidden.')
  }

  next()
}
