import { UserEntity } from '@models/entities/User.entity'
import typeormconn from '@utilities/typeorm.utils'

const getOneUserById = (id_user: string) => {
  return typeormconn.connection_one
    ?.getRepository(UserEntity)
    .findOne({
      where: {
        id_user
      }
    })
}

const getOneUserByEmail = async (email: string) => {
  return typeormconn.connection_one
    ?.getRepository(UserEntity)
    .findOne({
      where: {
        email
      }
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
  return typeormconn.connection_one?.getRepository(UserEntity).insert({
    name,
    email,
    password: hashed_password,
  })
}

const userServices = {
  getOneUserById,
  getOneUserByEmail,
  create,
}

export default userServices
