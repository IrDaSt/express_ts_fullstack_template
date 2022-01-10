import { UserEntity } from '@models/entities/user.entity'
import typeormconn from '@utilities/typeorm'
import uuidHelper from '@utilities/uuid'

const getOneUserById = (id_user: string) => {
  return typeormconn.connection_one
    ?.getRepository(UserEntity)
    .findOne({ id_user })
}

const getOneUserByEmail = async (email: string) => {
  return typeormconn.connection_one
    ?.getRepository(UserEntity)
    .findOne({ email })
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
    id_user: uuidHelper.generateUUIDV4(),
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
