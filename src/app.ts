import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import * as rfs from 'rotating-file-stream'
import createHttpError from 'http-errors'
import swaggerUi from 'swagger-ui-express'

import webRouter from '@routes/web'
import apiRouter from '@routes/api'
import swaggerConfig from './swagger/swagger-config'

const app = express()

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log('Development mode')

  app.use(morgan('dev'))
}

const pad = (num: number) => (num > 9 ? '' : '0') + num

// Create a rotating write stream for Logging system
const generator: rfs.Generator = (
  time: Date | number,
  index: number | undefined,
) => {
  if (!time) return 'access.log'

  if (typeof time !== 'number') {
    const month = time.getFullYear() + '-' + pad(time.getMonth() + 1)
    const day = pad(time.getDate())
    const hour = pad(time.getHours())
    const minute = pad(time.getMinutes())
    return `${month}/${month}${day}-${hour}${minute}-${
      index ?? ''
    }-access.log.gzip`
  } else {
    return 'access.log'
  }
}

const accessLogStream = rfs.createStream(generator, {
  size: '10M', // rotate every 10 MegaBytes written
  interval: '1d', // rotate daily
  compress: 'gzip', // compress rotated files
  path: 'logs', // place access log file to log folder
})

// Use Morgan Logging system
// Stream logs to file
app.use(morgan('combined', { stream: accessLogStream }))

// Json Parser
app.use(express.json())
// Form encoded Parser
app.use(express.urlencoded({ extended: true }))
// Cookie parser
app.use(cookieParser())

// Public folder set up
app.use(express.static(path.join(__dirname, 'public')))
// Cross-origin resource sharing
app.use(cors())

// Web Guard By Helmet
app.use(
  helmet({
    originAgentCluster: false,
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  }),
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Swagger UI
app.use(
  '/api-docs',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  swaggerUi.serve,
  swaggerUi.setup({ ...swaggerConfig }, { explorer: false }),
)

// Routing
app.use('/api', apiRouter)
app.use('/', webRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createHttpError(404))
})

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  const message = err.message
  const error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('pages/error', { message, error })
})

export default app
