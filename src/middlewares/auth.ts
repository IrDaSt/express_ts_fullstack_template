import config from "@constants/config"
import responses from "@utilities/responses.utils"
import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import { CustomExpressRequest } from "@custom-types/custom-express-request.type"
import cryptoUtils from "@utilities/crypto.utils"

const verifyToken = (
  req: CustomExpressRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization
  if (!authorization)
    return responses.Unauthorized(res, {
      message: "Please provide a bearer token authorization",
    })
  else {
    const token = authorization.split(" ")[1]
    const decrypt_token = cryptoUtils.decryptWithSecretKey(
      token,
      config.secret_token,
    )
    jwt.verify(
      decrypt_token,
      config.secret_token,
      (err, value: any | jwt.JwtPayload) => {
        if (err)
          return responses.Forbidden(res, {
            message: "Failed to authenticate token",
            err,
          })

        req.currentUser = value
        next()
      },
    )
  }
}

const authMiddleware = {
  verifyToken,
}

export default authMiddleware
