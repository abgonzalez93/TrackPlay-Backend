import { HTTP_STATUS } from '@constants/index'

/**
 * Error thrown when a required environment variable is missing or invalid.
 *
 * @class
 * @extends Error
 * @module errors
 */
export class EnvError extends Error {
  public statusCode: number
  public variable: string

  constructor(variable: string, message?: string) {
    super(message || `Missing or invalid environment variable: ${variable}`)
    this.name = 'EnvError'
    this.variable = variable
    this.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR
  }
}
