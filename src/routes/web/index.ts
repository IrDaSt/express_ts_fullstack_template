import { Request, Response, Router } from 'express'

const webRouter = Router()

webRouter.get('/', (req: Request, res: Response) => {
  res.render('pages/index', {
    title: 'Express',
  })
})

export default webRouter
