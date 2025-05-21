import { z } from 'zod'

/**
 * Schema for validating user input.
 *
 * @module schemas/userSchemas
 */
export const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).optional(),
})

export type CreateUserDTO = z.infer<typeof CreateUserSchema>
