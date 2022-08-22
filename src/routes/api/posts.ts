import { body, query, validationResult } from "express-validator"
import responses from "@utilities/responses.utils"
import { Request, Response, Router } from "express"
import upload from "@middlewares/multer"
import postsServices from "@services/api/posts.services"

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
  body("title_post").notEmpty().withMessage("title_post required"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { title_post, description_post } = req.body
    try {
      const result_insert_post = await postsServices.create({
        title_post,
        description_post,
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
  query("id_post").notEmpty().withMessage("id_post query required"),
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { id_post } = req.query
    try {
      if (id_post) {
        const result_delete_post = await postsServices.remove(
          id_post.toString(),
        )
        return responses.Success(res, result_delete_post)
      }
    } catch (error) {
      return responses.InternalServerErrorCatch(res, error)
    }
  },
)

export default postsRouterApi
