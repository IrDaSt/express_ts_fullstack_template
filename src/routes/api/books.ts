import upload from '@middlewares/multer'
import { BooksModel } from '@models/books.model'
import booksServices from '@services/api/books.services'
import responses from '@utilities/responses.utils'
import { NextFunction, Request, Response, Router } from 'express'
import { body, validationResult } from 'express-validator'
import { ResultSetHeader } from 'mysql2'

const booksRouterApi = Router()

booksRouterApi.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const books: Array<BooksModel> = await booksServices.getAllBooks()
      responses.Success(res, books)
    } catch (error) {
      responses.InternalServerErrorCatch(res, error)
      next(error)
    }
  },
)

booksRouterApi.post(
  '/create',
  upload.fields([]),
  body('name_book').notEmpty().withMessage('name_book body field required'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return responses.BadRequest(res, errors.array())
    }

    const { name_book, description_book } = req.body
    try {
      const result_insert_book: ResultSetHeader = await booksServices.create({
        name_book,
        description_book: description_book ?? null,
      })
      responses.Created(res, result_insert_book)
    } catch (error) {
      responses.InternalServerErrorCatch(res, error)
      next(error)
    }
  },
)

export default booksRouterApi
