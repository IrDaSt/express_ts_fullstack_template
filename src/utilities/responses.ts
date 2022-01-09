import { Response } from 'express'
import StatusCodes from 'http-status-codes'

interface ResponseCustom {
  status_code?: number
  data?: any
  status_message?: any
  error?: any
}

const responseCustom = ({
  status_code,
  status_message,
  data,
  error,
}: ResponseCustom) => {
  const response: ResponseCustom = {}
  response.status_code = status_code ?? StatusCodes.OK
  response.status_message = status_message ?? 'success'
  if (data) response.data = data
  if (error) response.error = error
  return response
}

const Success = (res: Response, data: any) =>
  res.status(StatusCodes.OK).json(
    responseCustom({
      status_code: StatusCodes.OK,
      data: data,
    }),
  )

const Created = (res: Response, data: any) =>
  res.status(StatusCodes.CREATED).json(
    responseCustom({
      status_code: StatusCodes.CREATED,
      data: data,
    }),
  )

const BadRequest = (res: Response, error: any) =>
  res.status(StatusCodes.BAD_REQUEST).json(
    responseCustom({
      status_code: StatusCodes.BAD_REQUEST,
      status_message: 'error',
      error: error,
    }),
  )

const Unauthorized = (res: Response, error: any) =>
  res.status(StatusCodes.UNAUTHORIZED).json(
    responseCustom({
      status_code: StatusCodes.UNAUTHORIZED,
      status_message: 'error',
      error: error,
    }),
  )

const NotFound = (res: Response, error: any) =>
  res.status(StatusCodes.NOT_FOUND).json(
    responseCustom({
      status_code: StatusCodes.NOT_FOUND,
      status_message: 'error',
      error: error,
    }),
  )

const InternalServerError = (res: Response, error: any) =>
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
    responseCustom({
      status_code: StatusCodes.INTERNAL_SERVER_ERROR,
      status_message: 'error',
      error: error,
    }),
  )

const responses = {
  Success,
  Created,
  Unauthorized,
  InternalServerError,
  BadRequest,
  NotFound,
  responseCustom,
}

export default responses
