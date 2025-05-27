import { assertValid, assertNotExists, assertExists } from '@utils/index'
import { CreateUserDTO, CreateUserDTOSchema } from '@schemas/index'
import { HTTP_STATUS } from '@constants/index'
import { userService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling user-related requests.
 *
 * @module controllers
 */
export const userController = {
  /**
   * Retrieves all users from the database.
   *
   * @param _req - Express request object (unused)
   * @param res - Express response object
   * @returns Responds with a list of all users
   */
  getAll: async (_req: Request, res: Response): Promise<void> => {
    const users = await userService.getAllUsers()
    res.json(users)
  },

  /**
   * Retrieves a specific user by their ID.
   *
   * @param req - Express request object containing the user ID in params
   * @param res - Express response object
   * @returns Responds with the user if found, otherwise throws a NOT_FOUND error
   */
  getById: async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id)
    const user = await userService.getUserById(id)

    assertExists(user, 'User not found')

    res.json(user)
  },

  /**
   * Creates a new user if the email and username are not already in use.
   *
   * @param req - Express request object containing user data in the body
   * @param res - Express response object
   * @returns Responds with the newly created user or throws a CONFLICT error
   */
  create: async (req: Request, res: Response): Promise<void> => {
    const dto = assertValid<CreateUserDTO>(CreateUserDTOSchema, req.body)

    const [emailExists, usernameExists] = await Promise.all([
      userService.getUserByEmail(dto.email),
      userService.getUserByUsername(dto.username),
    ])

    assertNotExists(emailExists, 'Email already in use')
    assertNotExists(usernameExists, 'Username already in use')

    const user = await userService.createUser(dto)
    res.status(HTTP_STATUS.CREATED).json(user)
  },
}
