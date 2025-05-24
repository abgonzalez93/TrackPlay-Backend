import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'
import { NextFunction } from 'express'

/**
 * Checks for an existing resource and throws conflict error if found.
 *
 * @param existing - Result of a find query
 * @param message - Conflict message to return
 * @param next - Express next middleware
 * @returns true if conflict exists, false otherwise
 */
export const checkConflict = <T>(
  existing: T | null,
  message: string,
  next: NextFunction
): boolean => {
  if (existing) {
    next(new ApiError(message, httpStatus.CONFLICT))
    return true
  }

  return false
}
