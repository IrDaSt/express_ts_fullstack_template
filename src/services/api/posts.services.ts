import { PostsEntity } from "@models/entities/Posts.entity"
import typeormconn from "@utilities/typeorm.utils"

const getAllPosts = async () => {
  const result = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .find({
      order: {
        created_at: "DESC",
      },
      relations: ["user_data"],
    })
  return result
}

const getOnePostById = async (id_post: string) => {
  const result = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .findOne({
      where: {
        id_post,
      },
      relations: ["user_data"],
    })
  return result
}

const create = async ({
  title_post,
  description_post,
  id_user_post,
}: {
  title_post: string
  description_post: string
  id_user_post: string
}) => {
  const new_post = new PostsEntity()
  new_post.title_post = title_post
  if (description_post !== undefined)
    new_post.description_post = description_post
  new_post.id_user_post = id_user_post
  const result_insert = await typeormconn.connection_one
    ?.getRepository(PostsEntity)
    .insert(new_post)
  return result_insert
}

const remove = async (id_post: string) => {
  return typeormconn.connection_one?.getRepository(PostsEntity).delete({
    id_post,
  })
}

const postsServices = {
  getAllPosts,
  getOnePostById,
  create,
  remove,
}

export default postsServices
