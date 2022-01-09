import responses from '@utilities/responses'
import { Request, Response, Router } from 'express'
import { getAllPosts } from 'src/services/api/posts.services'

const postsRouterApi = Router()

postsRouterApi.get('/', async (req: Request, res: Response) => {
  try {
    const posts_list = await getAllPosts()
    responses.Success(res, posts_list)
  } catch (error) {
    return responses.InternalServerError(res, error)
  }
})

export default postsRouterApi
