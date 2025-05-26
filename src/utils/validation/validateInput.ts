import { Request, NextFunction } from 'express'
import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'
import { ZodTypeAny } from 'zod'

/**
 * Validates input using a Zod schema and forwards error to next middleware if invalid.
 *
 * @param schema - Zod schema to validate against
 * @param req - Express request object
 * @param next - Express next middleware
 * @returns Parsed DTO or undefined
 */
export const validateInput = <T>(
  schema: ZodTypeAny,
  req: Request,
  next: NextFunction,
): T | undefined => {
  const parsed = schema.safeParse(req.body)

  if (!parsed.success) {
    next(
      new ApiError(
        'Invalid input',
        httpStatus.BAD_REQUEST,
        parsed.error.flatten(),
      ),
    )
    return
  }

  return parsed.data
}
