import { CreateUserDTO, CreateUserDTOSchema } from '@dtos/index'
import { validateInput, checkConflict } from '@helpers/index'
import { Request, Response, NextFunction } from 'express'
import { checkNotFound } from '@helpers/index'
import { userService } from '@services/index'
import { httpStatus } from '@constants/index'

/**
 * Controller for handling user-related requests.
 *
 * @module controllers/userController
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
   * @param next - Express next middleware function for error handling
   * @returns Responds with the user if found, otherwise passes an error to next
   */
  getById: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const id = Number(req.params.id)
    const user = await userService.getUserById(id)

    if (checkNotFound(user, 'User not found', next)) return

    res.json(user)
  },

  /**
   * Creates a new user if the email and username are not already in use.
   *
   * @param req - Express request object containing user data in the body
   * @param res - Express response object
   * @param next - Express next middleware function for error handling
   * @returns Responds with the newly created user or an error if conflict exists
   */
  create: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const dto = validateInput<CreateUserDTO>(CreateUserDTOSchema, req, next)
    if (!dto) return

    const [emailExists, usernameExists] = await Promise.all([
      userService.getUserByEmail(dto.email),
      userService.getUserByUsername(dto.username),
    ])

    if (checkConflict(emailExists, 'Email already in use', next)) return
    if (checkConflict(usernameExists, 'Username already in use', next)) return

    const user = await userService.createUser(dto)
    res.status(httpStatus.CREATED).json(user)
  },
}
