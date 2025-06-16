import { Prisma, User } from '@prisma/client'
import { prisma } from '@config/index'

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
  findAll: (): Promise<User[]> => prisma.user.findMany(),

  /**
   * Finds a user by their unique ID.
   *
   * @param id - The ID of the user
   * @returns A promise resolving to the User or null if not found
   */
  findById: (id: number): Promise<User | null> => prisma.user.findUnique({ where: { id } }),

  /**
   * Finds a user by their email address.
   *
   * @param email - The email to search for
   * @returns A promise resolving to the User or null if not found
   */
  findByEmail: (email: string): Promise<User | null> => prisma.user.findUnique({ where: { email } }),

  /**
   * Finds a user by their public username.
   *
   * @param username - The username to search for
   * @returns A promise resolving to the User or null if not found
   */
  findByUsername: (username: string): Promise<User | null> => prisma.user.findUnique({ where: { username } }),

  /**
   * Creates a new user in the database.
   *
   * @param data - The data required to create a new user
   * @returns A promise resolving to the created User
   */
  create: (data: Prisma.UserCreateInput): Promise<User> => prisma.user.create({ data }),
}
