import { sign, verify } from 'jsonwebtoken'
import { expressjwt as jwt } from 'express-jwt'
import { NextFunction, Request, Response } from 'express'
import { model } from 'mongoose'

import { IUser } from 'nxt-shared/dist/types/user.interface'
import { EUserRole } from 'nxt-shared/dist/enums/user-role.enum'
import { EUserStatus } from 'nxt-shared/dist/enums/user-status.enum'
import { EHttpStatusCodes } from 'nxt-shared/dist/enums/http-status-codes.enum'
import { UserSchema } from 'nxt-shared/dist/schemas/user.schema'
// import { FileManagerSchema } from 'nxt-shared/dist/schemas/file-manager.schema'

import { settingsConfig } from '../config/settings.config'
import { ErrorHandler } from './error-handler.helper'

const defaultExpiresIn = 60 * 60 * 24 * 14
const secret = settingsConfig.jwt.secret

export class JwtHelper {
  private model

  constructor() {
    /*try {
      model('FileManager')
    } catch (e) {
      model('FileManager', FileManagerSchema, 'file-manager')
    }*/

    try {
      this.model = model('User')
    } catch (e) {
      this.model = model('User', UserSchema, 'user')
    }
  }

  public generateJWT(user: IUser, expiresIn = defaultExpiresIn) {
    const token = sign({ _id: user._id, email: user.email, password: user.password }, secret, {
      algorithm: 'HS256',
      expiresIn
    })

    return { token, expiresIn }
  }

  public decodeJWT(token: string) {
    return verify(token, secret, { algorithms: ['HS256'] })
  }

  public async getUserFromToken(token: string) {
    const decodedUser = this.decodeJWT(token) as { _id: string; email: string; password: string }

    const user = decodedUser ? await this.model.findById(decodedUser._id) : null

    return user
  }

  public middleware(shouldBeActive = false) {
    return [
      jwt({ secret: secret, algorithms: ['HS256'] }),
      (err, req: Request, res: Response, next: NextFunction) => {
        if (err) {
          throw new ErrorHandler(err.status, err.message)
        }

        next()
      },
      async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization.split(' ')[1]
        const decodedUser = this.decodeJWT(token) as { _id: string; email: string; password: string }

        const userFound = await this.model.findById(decodedUser._id).populate('avatar')

        if (!userFound || userFound.password !== decodedUser.password) {
          throw new ErrorHandler(EHttpStatusCodes.unauthorized, 'User not found')
        }

        if (shouldBeActive && userFound.status !== EUserStatus.active) {
          throw new ErrorHandler(EHttpStatusCodes.forbidden, 'User not active')
        }

        if (userFound.status === EUserStatus.banned) {
          throw new ErrorHandler(EHttpStatusCodes.forbidden, 'User banned')
        }

        res['locals'].user = { ...userFound.toObject(), password: undefined }

        userFound.lastAction = Date.now()

        try {
          await userFound.save()

          next()
        } catch (err) {
          next(err)
        }
      },
      (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
        if (err) {
          throw new ErrorHandler(err.statusCode, err.message)
        }

        next()
      }
    ]
  }

  public checkForRoles(roles: EUserRole[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const user = res['locals'].user as IUser

      if (!roles.includes(user.role)) {
        throw new ErrorHandler(EHttpStatusCodes.forbidden, "You don't have the permission to access this resource.")
      }

      next()
    }
  }
}

export default new JwtHelper()
