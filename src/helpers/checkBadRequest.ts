import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'
import { NextFunction } from 'express'

/**
 * Throws a Bad Request error if a required value is missing or invalid.
 *
 * @param condition - Boolean condition to check (e.g. if value is missing)
 * @param message - Error message to return
 * @param next - Express next middleware
 * @returns true if bad request was detected, false otherwise
 */
export const checkBadRequest = (
  condition: boolean,
  message: string,
  next: NextFunction,
): boolean => {
  if (condition) {
    next(new ApiError(message, httpStatus.BAD_REQUEST))
    return true
  }

  return false
}
