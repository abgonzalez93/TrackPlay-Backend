import { z } from 'zod'

/**
 * Zod schema for creating a new user.
 */
export const CreateUserSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(1).optional(),
    password: z.string().min(8),
    username: z.string().min(3),
    avatarUrl: z.string().url().optional(),
    bio: z.string().max(280).optional(),
    passwordConfirm: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Passwords must match',
    path: ['passwordConfirm'],
  })
