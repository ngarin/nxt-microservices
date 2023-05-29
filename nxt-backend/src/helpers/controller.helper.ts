import { Types } from 'mongoose'
import { AnySchema, ValidationResult } from '@hapi/joi'

import { EHttpStatusCodes } from 'nxt-shared/dist/enums/http-status-codes.enum'
import { ErrorHandler } from './error-handler.helper'

export class ControllerHelper {
  constructor(private joiSchema?: AnySchema) {
    this.joiSchema = joiSchema
  }

  public isBodyValid<T>(body: T): T {
    const { error, value }: ValidationResult = this.joiSchema.validate(body)
    if (error) {
      throw new ErrorHandler(EHttpStatusCodes.badRequest, error)
    }

    return value
  }

  public isObjectIdValid(objectId: string) {
    if (!Types.ObjectId.isValid(objectId)) {
      throw new ErrorHandler(EHttpStatusCodes.badRequest, 'The id you provided is not valid.')
    }

    return new Types.ObjectId(objectId)
  }
}
