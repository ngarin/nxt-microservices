import { Schema } from 'mongoose'

import { EUserStatus } from '../enums/user-status.enum'
import { EUserRole } from '../enums/user-role.enum'

const UserSchema: Schema = new Schema({
  creation: {
    type: Date,
    default: Date.now
  },
  lastAction: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    trim: true,
    unique: true
  },
  username: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  status: {
    type: EUserStatus,
    trim: true
  },
  role: {
    type: EUserRole,
    default: EUserRole.user
  }
})

UserSchema.index({ username: 'text' })

export { UserSchema }
