import authMiddleware from '@middlewares/auth'
import upload from '@middlewares/multer'
import userServices from '@services/api/user.services'
import cryptoUtils from '@utilities/crypto.utils'
import jwtUtils from '@utilities/jsonwebtoken.utils'
import responses from '@utilities/responses.utils'
import { Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import { CustomExpressRequest } from '@custom-types/custom-express-request.type'
import { InsertResult } from 'typeorm'
import { UserEntity } from '@models/entities/User.entity'

const authRouterApi = Router()

authRouterApi.get(
  '/info',
  authMiddleware.verifyToken,
  async (req: CustomExpressRequest, res: Response) => {
    const jwtData = req.currentUser
    try {
      if (jwtData) {
        const result_user_data: any = await userServices.getOneUserById(
          jwtData.id_user,
        )
        if (!result_user_data) {
          return responses.InternalServerError(res, {
            message: 'User not found',
          })
        }
        const user_data: UserEntity = result_user_data
        responses.Success(res, user_data)
      }
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

authRouterApi.post(
  '/login',
  upload.fields([]),
  body('email')
    .notEmpty()
    .withMessage('email field required')
    .isEmail()
    .withMessage('email field must be an email'),
  body('password').notEmpty().withMessage('password field required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { email, password } = req.body
    try {
      const result_check_email: any = await userServices.getOneUserByEmail(
        email,
      )
      if (!result_check_email) {
        return responses.InternalServerError(res, {
          message: 'login failed',
        })
      }

      const [encrypted_password, salt] = result_check_email.password.split(':')

      if (encrypted_password === cryptoUtils.encryptWithSalt(password, salt)) {
        const token = jwtUtils.generateToken({
          id_user: result_check_email.id_user,
        })
        responses.Success(res, {
          message: 'login success',
          token,
        })
      } else {
        responses.InternalServerError(res, {
          message: 'login failed',
        })
      }
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

authRouterApi.post(
  '/register',
  upload.fields([]),
  body('email')
    .notEmpty()
    .withMessage('email field required')
    .isEmail()
    .withMessage('email field must be and email'),
  body('password').notEmpty().withMessage('password field required'),
  body('name').notEmpty().withMessage('name field required'),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { email, password, name } = req.body
    try {
      const result_check_email = await userServices.getOneUserByEmail(email)
      if (result_check_email) {
        return responses.InternalServerError(res, {
          message: 'Email already used',
        })
      }
      const salt = cryptoUtils.generateSalt()
      const result_register:
        | InsertResult
        | undefined = await userServices.create({
        name,
        email,
        hashed_password: `${cryptoUtils.encryptWithSalt(
          password,
          salt,
        )}:${salt}`,
      })
      if (!result_register) {
        return responses.InternalServerError(res, {
          message: 'Database error',
        })
      }
      const token = jwtUtils.generateToken({
        id_user: result_register.identifiers[0].id_user,
      })
      responses.Success(res, {
        message: 'Register success',
        token,
      })
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

export default authRouterApi
