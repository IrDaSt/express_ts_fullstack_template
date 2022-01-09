import config from '@constants/config'
import Posts from 'src/services/api/entities/posts.entity'
import { Connection, createConnection } from 'typeorm'

const connection_one = createConnection({
  type: 'mariadb',
  name: 'connection_one',
  host: config.database.one.host,
  port: config.database.one.port,
  username: config.database.one.user,
  password: config.database.one.password,
  database: config.database.one.database,
  synchronize: false,
  entities: [Posts],
})

class TypeOrmConnection {
  connection_one?: Connection

  constructor() {
    connection_one
      .then((conn) => {
        this.connection_one = conn
      })
      .catch((err) => {
        console.log('database connection_one error')
        console.log(err)
        return
      })
  }
}

const typeormconn = new TypeOrmConnection()

export default typeormconn
