import { Request, Response, NextFunction } from 'express'
import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'


/**
 * Global error-handling middleware.
 *
 * @module middlewares/errorHandler
 */
export const errorHandler = (error: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({ error: error.message })
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Unexpected error' })
  }
}
