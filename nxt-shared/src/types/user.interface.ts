import { EUserRole } from '../enums/user-role.enum'
import { EUserStatus } from '../enums/user-status.enum'

export interface IUser {
  _id?: string
  email: string
  username: string
  password: string
  status: EUserStatus
  role: EUserRole
}
