import { PostsEntity } from '@services/entities/posts.entity'
import typeormconn from '@utilities/typeorm'

export const getAllPosts = async () => {
  const result = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .find()
  return result
}

export const getOnePostById = async (id_post: string) => {
  const result = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .findOne({ id_post })
  return result
}
