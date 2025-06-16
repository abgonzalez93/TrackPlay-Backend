import {
  CreateUserDTO,
  CreateUserDTOSchema,
  UserId,
  UserIdSchema,
  UserEmail,
  UserEmailSchema,
} from '@trackplay/core/schemas'
import { parseOrThrow } from '@trackplay/core/utils'
import { HTTP_STATUS } from '@trackplay/core/constants'
import { NotFoundError } from '@trackplay/core/errors'
import { userService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling user-related requests.
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
    res.status(HTTP_STATUS.OK).json(users)
  },

  /**
   * Retrieves a specific user by their ID.
   *
   * @param req - Express request object containing the user ID in params
   * @param res - Express response object
   * @returns Responds with the user if found, otherwise throws a NOT_FOUND error
   */
  getById: async (req: Request, res: Response): Promise<void> => {
    const id = parseOrThrow<UserId>(UserIdSchema, req.params.id)
    const user = await userService.getUserById(id)
    if (!user) throw new NotFoundError('User not found')
    res.status(HTTP_STATUS.OK).json(user)
  },

  /**
   * Retrieves a user by their email address.
   *
   * @param req - Express request object with `email` as query param
   * @param res - Express response object
   * @returns Responds with the user if found, otherwise throws NOT_FOUND
   */
  getByEmail: async (req: Request, res: Response): Promise<void> => {
    const email = parseOrThrow<UserEmail>(UserEmailSchema, req.query.email)
    const user = await userService.getUserByEmail(email)
    if (!user) throw new NotFoundError('User not found')
    res.status(HTTP_STATUS.OK).json(user)
  },

  /**
   * Creates a new user if the email and username are not already in use.
   *
   * @param req - Express request object containing user data in the body
   * @param res - Express response object
   * @returns Responds with the newly created user or throws a CONFLICT error
   */
  create: async (req: Request, res: Response): Promise<void> => {
    const dto = parseOrThrow<CreateUserDTO>(CreateUserDTOSchema, req.body)
    const user = await userService.createUser(dto)
    res.status(HTTP_STATUS.CREATED).json(user)
  },
}
