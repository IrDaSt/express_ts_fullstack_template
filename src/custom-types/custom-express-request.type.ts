import { UserModel } from '@models/User.model'
import { Request } from 'express'

export interface CustomExpressRequest extends Request {
  currentUser?: UserModel
}
