import config from '@constants/config'
import jwt from 'jsonwebtoken'
import idGeneratorUtils from '@utilities/id-generator.utils'

const generateToken = (data: any) => {
  const token = jwt.sign(data, config.secret_token, { expiresIn: '24h' })
  const tokenize =
    token.substring(0, 40) +
    idGeneratorUtils.generateUUIDV4().slice(-15) +
    token.substring(40)
  return tokenize
}

const jwtUtils = {
  generateToken,
}

export default jwtUtils
