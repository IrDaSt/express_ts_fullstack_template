import typeormconn from '@utilities/typeorm'
import Posts from './entities/posts.entity'

export const getAllPosts = async () => {
  const result = await typeormconn.connection_one?.getRepository(Posts).find()
  return result
}

export const getOnePostById = async (id_post: string) => {
  const result = await typeormconn.connection_one
    ?.getRepository(Posts)
    .findOne({ id_post })
  return result
}
