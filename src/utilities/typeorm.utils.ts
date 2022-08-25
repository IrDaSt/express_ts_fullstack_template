import config from "@constants/config"
import { PostsEntity } from "@models/entities/Posts.entity"
import { UserEntity } from "@models/entities/User.entity"
import { DataSource, DataSourceOptions } from "typeorm"
import { loggerConsole } from "./winston.utils"

const connection_one: DataSourceOptions = {
  type: "mariadb",
  name: "connection_one",
  host: config.database.one.host,
  port: config.database.one.port,
  username: config.database.one.user,
  password: config.database.one.password,
  database: config.database.one.database,
  synchronize: false,
  cache: {
    type: "redis",
    options: {
      host: "localhost",
      port: 6379,
    },
  },
  entities: [PostsEntity, UserEntity],
}

class TypeOrmConnection {
  connection_one?: DataSource

  constructor() {
    this.init()
  }

  init = async () => {
    await this.connectOne()
    if (!this.connection_one?.isInitialized) this.reconnectOne()
  }

  connectOne = async () => {
    if (this.connection_one?.isInitialized) return
    loggerConsole.info(`connecting to connection_one...`)
    const data_source_connection_one = new DataSource(connection_one)
    await data_source_connection_one
      .initialize()
      .then((conn: DataSource) => {
        this.connection_one = conn
        loggerConsole.info(`connected to connection_one`)
      })
      .catch((err: any) => {
        loggerConsole.error("database connection_one error")
        // eslint-disable-next-line no-console
        console.error({
          error: {
            message: err.message,
            stack: err.stack,
            ...err,
          },
        })
        return
      })
  }

  disconnectOne = async () => {
    if (this.connection_one?.isInitialized) await this.connection_one?.destroy()
  }

  reconnectOne = async () => {
    await this.disconnectOne()
    while (!this.connection_one?.isInitialized) {
      await this.connectOne()
      if (this.connection_one?.isInitialized) return
      loggerConsole.info(`reconnecting to database_one after 10 seconds...`)
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  }
}

const typeormconn = new TypeOrmConnection()

export default typeormconn
