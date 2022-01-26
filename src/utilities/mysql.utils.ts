import config from '@constants/config'
import mysql from 'mysql2/promise'

const query = async (sql: string, values?: any) => {
  const conn = await mysql.createConnection({
    ...config.database.one,
  })
  const [result] = await conn.query(sql, values)
  return result
}

const mysqlconn = {
  query,
}

export default mysqlconn
