import { ChangePassword, ChangeUsername, CreateUser, PublicUser } from '@trackplay/core/schemas'
import { ConflictError, NotFoundError } from '@trackplay/core/errors'
import { hashPassword, toPublicUser } from '@utils/index'
import { userRepository } from '@repositories/index'
import { User } from '@prisma/client'

const path = 'backend.services.userService'

/**
 * Service for business logic related to user operations.
 */
export const userService = {
  /**
   * Retrieves all users from the database.
   *
   * @returns A promise that resolves to an array of users
   */
  getAllUsers: async (): Promise<PublicUser[]> => {
    const users = await userRepository.findAll()
    const parsedUsers = users.map((user) => toPublicUser(user))
    return parsedUsers
  },

  /**
   * Finds a user by their unique ID or throws an error if not found.
   *
   * @param id - User ID
   * @returns The found user
   * @throws NotFoundError if no user exists with the given ID
   */
  getUserById: async (id: number): Promise<PublicUser> => {
    const user = await userRepository.findBy({ id })
    if (!user) throw new NotFoundError(`${path}.user_not_found_by_id`)
    return toPublicUser(user)
  },

  /**
   * Finds a user by their email or throws NotFoundError if not found.
   *
   * @param email - Email address
   * @returns The found user
   * @throws NotFoundError if no user is found
   */
  getUserByEmail: async (email: string): Promise<PublicUser> => {
    const user = await userRepository.findBy({ email })
    if (!user) throw new NotFoundError(`${path}.username_not_found`)
    return toPublicUser(user)
  },

  /**
   * Finds a user by their username or throws an error if not found.
   *
   * @param username - Username of the user
   * @returns The found user
   * @throws NotFoundError if no user exists with the given username
   */
  getUserByUsername: async (username: string): Promise<PublicUser> => {
    const user = await userRepository.findBy({ username })
    if (!user) throw new NotFoundError(`${path}.username_not_found`)
    return toPublicUser(user)
  },

  /**
   * Retrieves a user for authentication purposes.
   * Accepts either an email or a username as identifier.
   *
   * @param identifier - Email or username used to log in
   * @returns The full User entity (including sensitive fields like password)
   * @throws NotFoundError if the user does not exist
   */
  getUserForAuth: async (identifier: string): Promise<User> => {
    const user = identifier.includes('@')
      ? await userRepository.findBy({ email: identifier })
      : await userRepository.findBy({ username: identifier })

    if (!user) throw new NotFoundError(`${path}.invalid_credentials`)
    return user
  },

  /**
   * Returns a user suitable for authenticated frontend clients.
   *
   * @param id - The user ID extracted from the JWT
   * @returns PublicUser DTO
   */
  getMe: async (id: number): Promise<PublicUser> => await userService.getUserById(id),

  /**
   * Creates a new user after validating uniqueness constraints.
   *
   * @param userData - Data Transfer Object containing user data
   * @returns A promise that resolves to the newly created user
   */
  createUser: async (userData: CreateUser): Promise<PublicUser> => {
    const email = userData.email
    const username = userData.username

    const [emailExists, usernameExists] = await Promise.all([
      userRepository.findBy({ email: email }),
      userRepository.findBy({ username: username }),
    ])

    if (emailExists)
      throw new ConflictError({
        key: `${path}.email_taken`,
        variables: { email: email },
      })

    if (usernameExists)
      throw new ConflictError({
        key: `${path}.username_taken`,
        variables: { username: username },
      })

    const user = await userRepository.create(userData)
    return toPublicUser(user)
  },

  /**
   * Updates the password of a user.
   *
   * @param userId - User ID
   * @param newHashedPassword - Hashed password string
   */
  updatePassword: async (userId: number, newHashedPassword: string): Promise<void> => {
    await userRepository.update(userId, { password: newHashedPassword })
  },

  /**
   * Updates the username of a user.
   *
   * @param userId - User ID
   * @param newUsername - New username to set
   */
  updateUsername: async (userId: number, newUsername: string): Promise<void> => {
    await userRepository.update(userId, { username: newUsername })
  },

  /**
   * Updates the user's password.
   *
   * Used in flows like password recovery or authenticated password changes.
   *
   * @param input - Object containing the user ID and new password
   */
  changePassword: async (input: ChangePassword): Promise<void> => {
    const { userId, newPassword } = input
    const hashed = await hashPassword(newPassword)
    await userService.updatePassword(userId, hashed)
  },

  /**
   * Updates the user's public username.
   *
   * @param input - Object containing the user ID and new username
   */
  changeUsername: async (input: ChangeUsername): Promise<void> => {
    const { userId, newUsername } = input
    await userService.getUserByUsername(newUsername)
    await userService.updateUsername(userId, newUsername)
  },
}
