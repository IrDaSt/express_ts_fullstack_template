import express from 'express'
import morgan from 'morgan'
import path from 'path'

import webRouter from '@routes/web'
import apiRouter from '@routes/api'

const app = express()

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line no-console
  console.log('Development mode')

  app.use(morgan('dev'))
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/api', apiRouter)
app.use('/', webRouter)

export default app
