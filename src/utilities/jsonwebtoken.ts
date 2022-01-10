import config from '@constants/config'
import jwt from 'jsonwebtoken'
import uuidHelper from './uuid'

const generateToken = (data: any) => {
  const token = jwt.sign(data, config.secret_token, { expiresIn: '24h' })
  const tokenize =
    token.substring(0, 40) +
    uuidHelper.generateUUIDV4().slice(-15) +
    token.substring(40)
  return tokenize
}

const jwtHelper = {
  generateToken,
}

export default jwtHelper
