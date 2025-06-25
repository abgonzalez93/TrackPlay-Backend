import { PublicUser, PublicUserSchema } from '@trackplay/core/schemas'
import { parseOrThrow } from '@trackplay/core/utils'
import { User } from '@prisma/client'

/**
 * Converts a raw User entity to a safe PublicUser DTO using Zod schema.
 *
 * @param user - Raw Prisma User entity
 * @returns Validated and transformed PublicUser object
 */
export const toPublicUser = (user: User): PublicUser =>
  parseOrThrow(PublicUserSchema, user, 'Public user data is not in a valid format')
