import typeormconn from '@utilities/typeorm'
import Posts from './entities/posts.entity'

export const getAllPosts = async () => {
  const result = await typeormconn.connection_one?.getRepository(Posts).find()
  return result
}
