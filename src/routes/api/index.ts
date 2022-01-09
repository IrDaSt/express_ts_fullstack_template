import responses from '@utilities/responses'
import { Request, Response, Router } from 'express'

const apiRouter = Router()

apiRouter.get('/', (req: Request, res: Response) => {
  return responses.Success(res, {
    message: 'Welcome to typescript rest api',
  })
})

export default apiRouter
