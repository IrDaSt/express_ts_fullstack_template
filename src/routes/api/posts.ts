/* eslint-disable @typescript-eslint/no-misused-promises */
import responses from '@utilities/responses'
import { Request, Response, Router } from 'express'
import { getAllPosts, getOnePostById } from 'src/services/api/posts.services'

const postsRouterApi = Router()

postsRouterApi.get('/', async (req: Request, res: Response) => {
  const { id_post } = req.query
  try {
    if (id_post) {
      const post = await getOnePostById(id_post.toString())
      if (post) {
        return responses.Success(res, post)
      } else {
        return responses.NotFound(res, {
          message: 'post not found',
        })
      }
    } else {
      const posts = await getAllPosts()
      return responses.Success(res, posts)
    }
  } catch (error) {
    return responses.InternalServerError(res, error)
  }
})

export default postsRouterApi
