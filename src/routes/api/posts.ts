import { body, validationResult } from 'express-validator'
import responses from '@utilities/responses'
import { NextFunction, Request, Response, Router } from 'express'
import upload from '@middlewares/multer'
import postsServices from '@services/api/posts.services'

const postsRouterApi = Router()

postsRouterApi.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    const { id_post } = req.query
    try {
      if (id_post) {
        const post = await postsServices.getOnePostById(id_post.toString())
        if (post) {
          return responses.Success(res, post)
        } else {
          return responses.NotFound(res, {
            message: 'post not found',
          })
        }
      } else {
        const posts = await postsServices.getAllPosts()
        return responses.Success(res, posts)
      }
    } catch (error) {
      responses.InternalServerErrorCatch(res, error)
      next(error)
    }
  },
)

postsRouterApi.post(
  '/create',
  upload.fields([]),
  body('title_post').notEmpty().withMessage('title_post required'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { title_post, description_post } = req.body
    try {
      const result_insert_post = await postsServices.create({
        title_post,
        description_post: description_post ?? null,
      })
      return responses.Success(res, result_insert_post)
    } catch (error) {
      responses.InternalServerErrorCatch(res, error)
      next(error)
    }
  },
)

export default postsRouterApi
