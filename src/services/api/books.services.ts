import mysqlconn from '@utilities/mysql'

const getAllBooks = async () => {
  const result = await mysqlconn.query('select * from books')
  return result
}

const booksServices = {
  getAllBooks,
}

export default booksServices
