import { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from '@constants/index'
import { ApiError } from '@errors/index'

/**
 * Global error-handling middleware.
 *
 * @module middlewares
 */
export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (error instanceof ApiError) {
    const response: Record<string, unknown> = {
      error: error.message,
    }

    if (error.meta) response.details = error.meta

    res.status(error.statusCode).json(response)
  } else {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: 'Unexpected error' })
  }
}
