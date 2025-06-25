import { Prisma, User } from '@prisma/client'
import { prisma } from '@services/index'

/**
 * Repository for User database operations.
 *
 * Handles all interactions with the database related to the User entity.
 */
export const userRepository = {
  /**
   * Retrieves all users from the database.
   *
   * @returns A promise resolving to an array of User entities
   */
  findAll: async (): Promise<User[]> => await prisma.user.findMany(),

  /**
   * Finds a user by a unique field such as ID, email or username.
   *
   * Accepts any unique constraint defined in the Prisma schema.
   *
   * @param where - An object containing a unique condition (e.g., { email }, { id }, { username })
   * @returns A promise resolving to the User or null if not found
   */
  findBy: async (where: Prisma.UserWhereUniqueInput): Promise<User | null> => await prisma.user.findUnique({ where }),

  /**
   * Creates a new user in the database.
   *
   * @param data - The data required to create a new user
   * @returns A promise resolving to the created User
   */
  create: async (data: Prisma.UserCreateInput): Promise<User> => await prisma.user.create({ data }),

  /**
   * Updates an existing user with the provided fields.
   *
   * @param id - The ID of the user to update
   * @param data - Partial object containing the fields to update (e.g., password, username)
   * @returns A promise resolving to the updated User entity
   */
  update: async (id: number, data: Partial<Prisma.UserUpdateInput>): Promise<User> =>
    await prisma.user.update({ where: { id }, data }),
}
