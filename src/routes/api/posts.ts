import { body, query, validationResult } from "express-validator"
import responses from "@utilities/responses.utils"
import { Request, Response, Router } from "express"
import upload from "@middlewares/multer"
import postsServices from "@services/api/posts.services"
import authMiddleware from "@middlewares/auth"
import { CustomExpressRequest } from "@custom-types/custom-express-request.type"

const postsRouterApi = Router()

postsRouterApi.get("/", async (req: Request, res: Response) => {
  const { id_post } = req.query
  try {
    if (id_post) {
      const post = await postsServices.getOnePostById(id_post.toString())
      if (post) {
        return responses.Success(res, post)
      } else {
        return responses.NotFound(res, {
          message: "post not found",
        })
      }
    } else {
      const posts = await postsServices.getAllPosts()
      return responses.Success(res, posts)
    }
  } catch (error) {
    return responses.InternalServerErrorCatch(res, error)
  }
})

postsRouterApi.post(
  "/create",
  upload.fields([]),
  authMiddleware.verifyToken,
  body("title_post").notEmpty().withMessage("title_post required"),
  async (req: CustomExpressRequest, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { title_post, description_post } = req.body
    const jwtData = req.currentUser
    try {
      if (!jwtData) return
      const result_insert_post = await postsServices.create({
        title_post,
        description_post,
        id_user_post: jwtData.id_user,
      })
      return responses.Created(res, result_insert_post)
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

postsRouterApi.delete(
  "/delete",
  upload.fields([]),
  authMiddleware.verifyToken,
  query("id_post").notEmpty().withMessage("id_post query required"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { id_post } = req.query
    try {
      if (id_post) {
        const target = await postsServices.getOnePostById(id_post.toString())
        if (!target) {
          return responses.NotFound(res, {
            message: "post not found",
          })
        }
        const result_delete = await postsServices.remove(id_post.toString())
        return responses.Success(res, result_delete)
      }
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

export default postsRouterApi
