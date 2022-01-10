import authMiddleware from '@middlewares/auth'
import upload from '@middlewares/multer'
import userServices from '@services/api/user.services'
import cryptoHelper from '@utilities/crypto'
import jwtHelper from '@utilities/jsonwebtoken'
import responses from '@utilities/responses'
import { NextFunction, Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import { CustomExpressRequest } from 'src/types/custom-express-request.type'
import { InsertResult } from 'typeorm'

const authRouterApi = Router()

authRouterApi.get(
  '/info',
  authMiddleware.verifyToken,
  (req: CustomExpressRequest, res: Response) => {
    responses.Success(res, req.currentUser)
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
  async (req: Request, res: Response, next: NextFunction) => {
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

      if (encrypted_password === cryptoHelper.encryptWithSalt(password, salt)) {
        const token = jwtHelper.generateToken({
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
      responses.InternalServerErrorCatch(res, error)
      next(error)
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
  async (req: Request, res: Response, next: NextFunction) => {
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
      const salt = cryptoHelper.generateSalt()
      const result_register:
        | InsertResult
        | undefined = await userServices.create({
        name,
        email,
        hashed_password: `${cryptoHelper.encryptWithSalt(
          password,
          salt,
        )}:${salt}`,
      })
      if (!result_register) {
        return responses.InternalServerError(res, {
          message: 'Database error',
        })
      }
      const token = jwtHelper.generateToken({
        id_user: result_register.identifiers[0].id_user,
      })
      responses.Success(res, {
        message: 'Register success',
        token,
      })
    } catch (error) {
      responses.InternalServerErrorCatch(res, error)
      next(error)
    }
  },
)

export default authRouterApi
