import { PostsEntity } from '@models/entities/Posts.entity'
import typeormconn from '@utilities/typeorm.utils'

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
  const new_post = new PostsEntity()
  new_post.title_post = title_post
  new_post.description_post = description_post
  const result_insert = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .insert(new_post)
  return result_insert
}

const postsServices = {
  getAllPosts,
  getOnePostById,
  create,
}

export default postsServices
