import { BooksModel } from '@models/books.model'
import booksServices from '@services/api/books.services'
import responses from '@utilities/responses'
import { NextFunction, Request, Response, Router } from 'express'

const booksRouterApi = Router()

booksRouterApi.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books_result: any = await booksServices.getAllBooks()
      const books: BooksModel = books_result
      responses.Success(res, books)
    } catch (error) {
      responses.InternalServerError(res, error)
      next(error)
    }
  },
)

export default booksRouterApi
