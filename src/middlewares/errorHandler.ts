import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'
import { Response } from 'express'

/**
 * Global error-handling middleware.
 *
 * @module middlewares/errorHandler
 */
export const errorHandler = (error: unknown, res: Response): void => {
  if (error instanceof ApiError) {
    const response: Record<string, unknown> = {
      error: error.message,
    }
    if (error.meta) response.details = error.meta
    res.status(error.statusCode).json(response)
  } else {
    res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Unexpected error' })
  }
}
