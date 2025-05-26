import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'
import { NextFunction } from 'express'

/**
 * Throws a Not Found error if a resource is not found.
 *
 * @param resource - The result of a DB/API call
 * @param message - Error message to return
 * @param next - Express next middleware
 * @returns true if resource not found, false otherwise
 */
export const checkNotFound = <T>(
  resource: T | null,
  message: string,
  next: NextFunction,
): boolean => {
  if (!resource) {
    next(new ApiError(message, httpStatus.NOT_FOUND))
    return true
  }

  return false
}
