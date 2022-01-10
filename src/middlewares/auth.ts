import config from '@constants/config'
import { UserModel } from '@models/user.model'
import userServices from '@services/api/user.services'
import responses from '@utilities/responses'
import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { CustomExpressRequest } from '@custom-types/custom-express-request.type'

const verifyToken = (
  req: CustomExpressRequest,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization
  if (!authorization)
    responses.Unauthorized(res, {
      message: 'Please provide a bearer token authorization',
    })
  else {
    const token = authorization.split(' ')[1]
    jwt.verify(
      token.substring(0, 40) + token.substring(40 + 15),
      config.secret_token,
      async (err, value: any | jwt.JwtPayload) => {
        if (err)
          responses.InternalServerError(res, {
            message: 'Failed to authenticate token',
          })

        try {
          const result_user_data: any = await userServices.getOneUserById(
            value.id_user,
          )
          if (!result_user_data) {
            return responses.InternalServerError(res, {
              message: 'User not found',
            })
          }
          const user_data: UserModel = result_user_data
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password, ...safe_user_data } = user_data
          req.currentUser = safe_user_data
          next()
        } catch (error) {
          return responses.InternalServerError(res, {
            message: 'Server error',
          })
        }
      },
    )
  }
}

const authMiddleware = {
  verifyToken,
}

export default authMiddleware
