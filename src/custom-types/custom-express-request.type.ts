import { JwtData } from '@models/JwtData.model'
import { Request } from 'express'

export interface CustomExpressRequest extends Request {
  currentUser?: JwtData
}
