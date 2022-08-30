import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import path from "path"
import cookieParser from "cookie-parser"
import cors from "cors"
import helmet from "helmet"
import createHttpError from "http-errors"
import swaggerUi from "swagger-ui-express"

import webRouter from "@routes/web"
import apiRouter from "@routes/api"
import swaggerConfig from "./swagger/swagger-config"
import { loggerHttp } from "@utilities/winston.utils"

const app = express()

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.log("Development mode")

  // Logging for development mode
  app.use(morgan("dev"))
}

// Use Morgan Logging system
// Stream logs to file
app.use(
  morgan("combined", {
    stream: {
      write: (message) => loggerHttp.info(message.trim()),
    },
  }),
)

// Json Parser
app.use(express.json())
// Form encoded Parser
app.use(express.urlencoded({ extended: true }))
// Cookie parser
app.use(cookieParser())

// Public folder set up
app.use(express.static(path.join(__dirname, "..", "public")))
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
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// Swagger UI
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup({ ...swaggerConfig }, { explorer: false }),
)

// Routing
app.use("/api", apiRouter)
app.use("/", webRouter)

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createHttpError(404))
})

// error handler
app.use(function (err: any, req: Request, res: Response) {
  // set locals, only providing error in development
  const message = err.message
  const error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("pages/error", { message, error })
})

export default app
