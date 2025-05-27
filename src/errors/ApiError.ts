import { HTTP_STATUS } from '@constants/index'

/**
 * Custom application-level error with optional status code.
 *
 * @class
 * @extends Error
 * @module errors
 */
export class ApiError extends Error {
  public statusCode: number
  public meta?: unknown

  constructor(message: string, statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR, meta?: unknown) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.meta = meta
  }
}
