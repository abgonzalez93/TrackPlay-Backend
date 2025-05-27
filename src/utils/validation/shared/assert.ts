import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'
import { ZodTypeAny } from 'zod'

/**
 * Validates a value using a Zod schema and throws a BAD_REQUEST error if invalid.
 *
 * @template T - Expected return type after validation
 * @param schema - The Zod schema to validate against
 * @param data - The value to validate
 * @param message - Custom error message to throw if validation fails
 * @returns The validated and parsed value
 * @throws ApiError if validation fails
 *
 * @module utils/validation
 */
export const assertValid = <T>(
  schema: ZodTypeAny,
  data: unknown,
  message: string = 'Invalid input',
): T => {
  const parsed = schema.safeParse(data)

  if (!parsed.success) {
    throw new ApiError(message, httpStatus.BAD_REQUEST, parsed.error.flatten())
  }

  return parsed.data
}

/**
 * Asserts that a value exists; otherwise throws a NOT_FOUND error.
 *
 * @template T - Expected type of the resource
 * @param value - The value to assert (e.g., result from DB or API)
 * @param message - Custom error message if value is null or undefined
 * @returns The value if it exists
 * @throws ApiError if value is null or undefined
 *
 * @module utils/validation
 */
export const assertExists = <T>(
  value: T | null | undefined,
  message: string = 'Resource not found',
): T => {
  if (value === null || value === undefined) {
    throw new ApiError(message, httpStatus.NOT_FOUND)
  }

  return value
}

/**
 * Asserts that a value does not exist; otherwise throws a CONFLICT error.
 *
 * @template T - Type of the conflicting resource
 * @param value - Value to check for existence
 * @param message - Custom conflict error message
 * @throws ApiError if value exists
 *
 * @module utils/validation
 */
export const assertNotExists = <T>(
  value: T | null,
  message: string = 'Resource already exists',
): void => {
  if (value) {
    throw new ApiError(message, httpStatus.CONFLICT)
  }
}

/**
 * Asserts that a condition is false; otherwise throws a FORBIDDEN error.
 *
 * @param condition - The condition to evaluate
 * @param message - Custom error message if condition is true
 * @throws ApiError if condition is true
 *
 * @module utils/validation
 */
export const assertNotForbidden = (condition: boolean, message: string = 'Access denied'): void => {
  if (condition) {
    throw new ApiError(message, httpStatus.FORBIDDEN)
  }
}

/**
 * Asserts that a condition is false; otherwise throws an UNAUTHORIZED error.
 *
 * @param condition - The condition to evaluate
 * @param message - Custom error message if condition is true
 * @throws ApiError if condition is true
 *
 * @module utils/validation
 */
export const assertAuthorized = (condition: boolean, message: string = 'Unauthorized'): void => {
  if (condition) {
    throw new ApiError(message, httpStatus.UNAUTHORIZED)
  }
}

/**
 * Asserts that a condition is false; otherwise throws a METHOD_NOT_ALLOWED error.
 *
 * @param condition - The condition to evaluate
 * @param message - Error message to return if condition is true
 * @throws ApiError if condition is true
 */
export const assertMethodAllowed = (condition: boolean, message = 'Method not allowed'): void => {
  if (condition) {
    throw new ApiError(message, httpStatus.METHOD_NOT_ALLOWED)
  }
}

/**
 * Asserts that a condition is false; otherwise throws a NOT_ACCEPTABLE error.
 *
 * @param condition - The condition to evaluate
 * @param message - Error message to return if condition is true
 * @throws ApiError if condition is true
 */
export const assertAcceptable = (condition: boolean, message = 'Not acceptable'): void => {
  if (condition) {
    throw new ApiError(message, httpStatus.NOT_ACCEPTABLE)
  }
}

/**
 * Asserts that a condition is false; otherwise throws an UNSUPPORTED_MEDIA_TYPE error.
 *
 * @param condition - The condition to evaluate
 * @param message - Error message to return if condition is true
 * @throws ApiError if condition is true
 */
export const assertMediaTypeSupported = (
  condition: boolean,
  message = 'Unsupported media type',
): void => {
  if (condition) {
    throw new ApiError(message, httpStatus.UNSUPPORTED_MEDIA_TYPE)
  }
}

/**
 * Asserts that a condition is false; otherwise throws a TOO_MANY_REQUESTS error.
 *
 * @param condition - The condition to evaluate
 * @param message - Error message to return if condition is true
 * @throws ApiError if condition is true
 */
export const assertRateLimit = (condition: boolean, message = 'Too many requests'): void => {
  if (condition) {
    throw new ApiError(message, httpStatus.TOO_MANY_REQUESTS)
  }
}

/**
 * Asserts that a condition is false; otherwise throws an UNPROCESSABLE_ENTITY error.
 *
 * @param condition - The condition to evaluate
 * @param message - Error message to return if condition is true
 * @throws ApiError if condition is true
 */
export const assertProcessable = (condition: boolean, message = 'Unprocessable entity'): void => {
  if (condition) {
    throw new ApiError(message, httpStatus.UNPROCESSABLE_ENTITY)
  }
}
