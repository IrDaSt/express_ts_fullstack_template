import express from 'express'
import morgan from 'morgan'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'

import webRouter from '@routes/web'
import apiRouter from '@routes/api'

const app = express()

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log('Development mode')

  app.use(morgan('dev'))
}

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
