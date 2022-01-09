import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import * as rfs from 'rotating-file-stream'

import webRouter from '@routes/web'
import apiRouter from '@routes/api'

const app = express()

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log('Development mode')

  app.use(morgan('dev'))
}

const pad = (num: number) => {
  return (num > 9 ? '' : '0') + num
}

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

app.use('/api', apiRouter)
app.use('/', webRouter)

export default app
