import { isAxiosError } from 'axios'

/**
 * Extracts a user-friendly error message from an unknown error.
 *
 * @param error - The error thrown
 * @returns A formatted string message
 *
 * @module utils/errors
 */
export const extractErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    return error.response?.data?.message ?? error.message
  }

  return (error as Error)?.message ?? 'Unexpected error'
}
