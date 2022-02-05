import responses from '@utilities/responses.utils'
import { loggerConsole } from '@utilities/winston.utils'
import { Request, Response, Router } from 'express'
import authRouterApi from './auth'
import booksRouterApi from './books'
import postsRouterApi from './posts'

const apiRouter = Router()

apiRouter.use('/posts', postsRouterApi)
apiRouter.use('/books', booksRouterApi)
apiRouter.use('/auth', authRouterApi)

apiRouter.get('/', (req: Request, res: Response) => {
  loggerConsole.info('Welcome')
  return responses.Success(res, {
    message: 'Welcome to typescript rest api',
  })
})

export default apiRouter
