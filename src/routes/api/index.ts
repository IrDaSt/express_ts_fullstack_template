import responses from '@utilities/responses'
import { Request, Response, Router } from 'express'
import postsRouterApi from './posts'

const apiRouter = Router()

apiRouter.use('/posts', postsRouterApi)

apiRouter.get('/', (req: Request, res: Response) => {
  return responses.Success(res, {
    message: 'Welcome to typescript rest api',
  })
})

export default apiRouter
