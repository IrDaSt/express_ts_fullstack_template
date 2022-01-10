import { PostsEntity } from '@models/entities/posts.entity'
import typeormconn from '@utilities/typeorm'
import uuidHelper from '@utilities/uuid'

const getAllPosts = async () => {
  const result = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .find({
      order: {
        created_at: 'DESC',
      },
    })
  return result
}

const getOnePostById = async (id_post: string) => {
  const result = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .findOne({ id_post })
  return result
}

const create = async ({
  title_post,
  description_post,
}: {
  title_post: string
  description_post: string
}) => {
  const id_post = uuidHelper.generateUUIDV4()
  const result_insert = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .insert({
      id_post: id_post,
      title_post,
      description_post,
    })
  return result_insert
}

const postsServices = {
  getAllPosts,
  getOnePostById,
  create,
}

export default postsServices
