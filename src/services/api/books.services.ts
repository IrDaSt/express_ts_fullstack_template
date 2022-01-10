/* eslint-disable @typescript-eslint/no-unsafe-return */
import mysqlconn from '@utilities/mysql'
import uuidHelper from '@utilities/uuid'

const getAllBooks = async () => {
  const result: any = await mysqlconn.query(
    'select * from books order by created_at desc',
  )
  return result
}

const create = async ({
  name_book,
  description_book,
}: {
  name_book: string
  description_book: string
}) => {
  const result: any = await mysqlconn.query(
    `
  insert into books 
  (id_book, name_book, description_book)
  values
  (?,?,?)
  `,
    [uuidHelper.generateUUIDV4(), name_book, description_book],
  )
  return result
}

const booksServices = {
  getAllBooks,
  create,
}

export default booksServices
