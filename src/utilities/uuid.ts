import * as uuid from 'uuid'

const generateUUIDV4 = (): string => {
  const uid: string = uuid.v4()
  return uid
}

const uuidHelper = {
  generateUUIDV4,
}

export default uuidHelper
