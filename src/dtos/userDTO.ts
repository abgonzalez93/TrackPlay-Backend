import { CreateUserSchema } from '@schemas/index'
import { z } from 'zod'

/**
 * DTO for user creation.
 */
export const CreateUserDTOSchema = CreateUserSchema.transform(
  ({ email, name, password, username, avatarUrl, bio }) => ({
    email,
    name,
    password,
    username,
    avatarUrl,
    bio,
  }),
)

export type CreateUserDTO = z.infer<typeof CreateUserDTOSchema>
