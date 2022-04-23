import config from '@constants/config'
import { PostsEntity } from '@models/entities/Posts.entity'
import { UserEntity } from '@models/entities/User.entity'
import { Connection, createConnection } from 'typeorm'
import { loggerConsole } from './winston.utils'

const connection_one = createConnection({
  type: 'mariadb',
  name: 'connection_one',
  host: config.database.one.host,
  port: config.database.one.port,
  username: config.database.one.user,
  password: config.database.one.password,
  database: config.database.one.database,
  synchronize: false,
  entities: [PostsEntity, UserEntity],
})

class TypeOrmConnection {
  connection_one: Connection

  constructor() {
    this.reconnectOne()
  }

  connectOne = async () => {
    if (this.connection_one?.isConnected) return
    await connection_one
      .then((conn: Connection) => {
        this.connection_one = conn
      })
      .catch((err: any) => {
        loggerConsole.error('database connection_one error')
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
    if (this.connection_one?.isConnected) await this.connection_one?.close()
  }

  reconnectOne = async () => {
    await this.disconnectOne()
    while (!this.connection_one?.isConnected) {
      await this.connectOne()
      if (this.connection_one?.isConnected) return
      loggerConsole.info(`reconnecting to database_one after 10 seconds...`)
      await new Promise((resolve) => setTimeout(resolve, 10000))
    }
  }
}

const typeormconn = new TypeOrmConnection()

export default typeormconn
