import config from "@constants/config"
import mysql from "mysql2/promise"

class MysqlConnection {
  conn?: mysql.Connection

  constructor() {
    this.initConnection()
  }

  async initConnection() {
    const conn = await mysql.createConnection({
      ...config.mysql_database.one,
    })
    this.conn = conn
  }

  public async query(sql: string, values?: any) {
    try {
      await this.conn?.connect()
    } catch (error) {
      const err: any = error
      if (err.code === "ECONNRESET") {
        await this.initConnection()
      }
    }

    if (this.conn) {
      const [result] = await this.conn.query(sql, values)
      return result
    } else {
      return this.conn
    }
  }
}

const mysqlconn = new MysqlConnection()

export default mysqlconn
