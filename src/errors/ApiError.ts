import { httpStatus } from '@constants/index'

/**
 * Custom application-level error with optional status code.
 *
 * @module errors/ApiError
 */
export class ApiError extends Error {
  public statusCode: number

  constructor(message: string, statusCode = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
  }
}
