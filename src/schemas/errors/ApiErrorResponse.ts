import { z } from 'zod'

/**
 * Schema representing field-level validation errors returned by Zod.
 */
export const ZodFieldErrorsSchema = z.record(z.array(z.string()))

/**
 * Schema representing the flattened structure of a Zod validation error.
 */
export const ZodFlattenedErrorSchema = z.object({
  formErrors: z.array(z.string()),
  fieldErrors: ZodFieldErrorsSchema,
})

/**
 * Schema representing a structured API error response.
 */
export const ApiErrorResponseSchema = z.object({
  error: z.string(),
  details: ZodFlattenedErrorSchema.optional(),
})

export type ApiErrorResponse = z.infer<typeof ApiErrorResponseSchema>
