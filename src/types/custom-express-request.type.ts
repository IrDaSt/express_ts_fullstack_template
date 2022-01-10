import { UserModel } from '@models/user.model'
import { Request } from 'express'

export interface CustomExpressRequest extends Request {
  currentUser?: UserModel
}
