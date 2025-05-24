import { httpStatus } from '@constants/index'

/**
 * Custom application-level error with optional status code.
 *
 * @module errors/ApiError
 */
export class ApiError extends Error {
  public statusCode: number
  public meta?: unknown

  constructor(message: string, statusCode = httpStatus.INTERNAL_SERVER_ERROR, meta?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.meta = meta
  }
}
