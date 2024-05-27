import { UserEntity } from "@models/entities/User.entity"
import typeormconn from "@utilities/typeorm.utils"

const getOneUserById = (id_user: string) => {
  return typeormconn.connection?.getRepository(UserEntity).findOne({
    where: {
      id_user,
    },
  })
}

const getOneUserByEmail = async (email: string) => {
  return typeormconn.connection?.getRepository(UserEntity).findOne({
    where: {
      email,
    },
  })
}

const create = async ({
  name,
  email,
  hashed_password,
}: {
  name: string
  email: string
  hashed_password: string
}) => {
  return typeormconn.connection?.getRepository(UserEntity).insert({
    name,
    email,
    password: hashed_password,
  })
}

const remove = async ({ id_user }: { id_user: string }) => {
  return typeormconn.connection?.getRepository(UserEntity).delete({
    id_user,
  })
}

const userServices = {
  getOneUserById,
  getOneUserByEmail,
  create,
  remove,
}

export default userServices
