import * as uuid from 'uuid'

const generateUUIDV4 = (): string => {
  const uid: string = uuid.v4()
  return uid
}

const nextId = ({
  id_lama,
  prefix_length,
}: {
  id_lama: string
  prefix_length: number
}) => {
  const prefix = id_lama.substring(0, Number(prefix_length))
  const angka_str = id_lama.substring(Number(prefix_length), id_lama.length)
  const angka_plus_str = (Number(angka_str) + 1)
    .toString()
    .padStart(angka_str.length, '0')
  return prefix + angka_plus_str
}

const idGeneratorUtils = {
  generateUUIDV4,
  nextId,
}

export default idGeneratorUtils
