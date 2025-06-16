import { CreateUserDTO } from '@trackplay/core/schemas'
import { ConflictError } from '@trackplay/core/errors'
import { userRepository } from '@repositories/index'
import { User } from '@prisma/client'

/**
 * Service for business logic related to user operations.
 */
export const userService = {
  /**
   * Retrieves all users from the database.
   *
   * @returns A promise that resolves to an array of users
   */
  getAllUsers: (): Promise<User[]> => userRepository.findAll(),

  /**
   * Finds a user by their unique ID.
   *
   * @param id - User ID
   * @returns A promise that resolves to the user or null if not found
   */
  getUserById: (id: number): Promise<User | null> => userRepository.findById(id),

  /**
   * Finds a user by their email address.
   *
   * @param email - Email address
   * @returns A promise that resolves to the user or null if not found
   */
  getUserByEmail: (email: string): Promise<User | null> => userRepository.findByEmail(email),

  /**
   * Finds a user by their username.
   *
   * @param username - Username
   * @returns A promise that resolves to the user or null if not found
   */
  getUserByUsername: (username: string): Promise<User | null> => userRepository.findByUsername(username),

  /**
   * Creates a new user after validating uniqueness constraints.
   *
   * @param data - Data Transfer Object containing user data
   * @returns A promise that resolves to the newly created user
   */
  createUser: async (data: CreateUserDTO): Promise<User> => {
    const [emailExists, usernameExists] = await Promise.all([
      userRepository.findByEmail(data.email),
      userRepository.findByUsername(data.username),
    ])

    if (emailExists) throw new ConflictError('Email already in use')
    if (usernameExists) throw new ConflictError('Username already in use')

    return userRepository.create(data)
  },
}
