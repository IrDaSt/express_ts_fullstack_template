import config from '@constants/config'
import jwt from 'jsonwebtoken'
import idGenerator from '@utilities/id-generator'

const generateToken = (data: any) => {
  const token = jwt.sign(data, config.secret_token, { expiresIn: '24h' })
  const tokenize =
    token.substring(0, 40) +
    idGenerator.generateUUIDV4().slice(-15) +
    token.substring(40)
  return tokenize
}

const jwtHelper = {
  generateToken,
}

export default jwtHelper
