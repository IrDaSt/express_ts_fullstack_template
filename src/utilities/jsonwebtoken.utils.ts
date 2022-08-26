import config from "@constants/config"
import jwt from "jsonwebtoken"
import cryptoUtils from "./crypto.utils"

const generateToken = (data: any) => {
  const token = jwt.sign(data, config.secret_token, { expiresIn: "24h" })
  const encrypt_token = cryptoUtils.encryptWithSecretKey(
    token,
    config.secret_token,
  )
  return encrypt_token
}

const jwtUtils = {
  generateToken,
}

export default jwtUtils
