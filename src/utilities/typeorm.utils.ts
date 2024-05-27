import { DataSource, DataSourceOptions } from "typeorm"
import { loggerConsole } from "./winston.utils"
import configDatabaseTemplate from "@constants/database/template"

class TypeORMConnection {
  private connection_option: DataSourceOptions
  private db: DataSource

  constructor(connection: DataSource) {
    this.db = connection
    this.connection_option = connection.options
    this.init()
  }

  public get connection(): DataSource {
    return this.db
  }

  public init = async () => {
    await this.connect()
    if (!this.db.isInitialized) this.reconnect()
  }

  private connect = async () => {
    loggerConsole.info(
      `connecting to connection ${
        this.connection_option.database?.toString() ?? ""
      }...`,
    )
    const data_source_connection = new DataSource(this.connection_option)
    await data_source_connection
      .initialize()
      .then((conn: DataSource) => {
        this.db = conn
        loggerConsole.info(
          `connected to connection ${
            this.connection_option.database?.toString() ?? ""
          }`,
        )
      })
      .catch((err: any) => {
        loggerConsole.error(
          `database connection error ${
            this.connection_option.database?.toString() ?? ""
          }`,
          {
            error: {
              message: err.message,
              stack: err.stack,
              ...err,
            },
          },
        )
        return
      })
  }

  public disconnect = async () => {
    if (this.db.isInitialized) await this.db.destroy()
  }

  private reconnect = async () => {
    await this.disconnect()
    while (!this.db.isInitialized) {
      loggerConsole.info(
        `reconnecting to ${
          this.connection_option.database?.toString() ?? ""
        } after 10 seconds...`,
      )
      await new Promise((resolve) => setTimeout(resolve, 10000))
      await this.connect()
      if (this.db.isInitialized) return
    }
  }
}

const typeormconn = new TypeORMConnection(configDatabaseTemplate)

export default typeormconn
