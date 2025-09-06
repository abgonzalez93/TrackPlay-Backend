import {
  CreateUserSchema,
  UserIdSchema,
  UserEmailSchema,
  ChangePasswordSchema,
  ChangeUsernameSchema,
} from '@trackplay/core/schemas'
import { HTTP_STATUS } from '@trackplay/core/constants'
import { parseOrThrow } from '@trackplay/core/utils'
import { userService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling user-related requests.
 */
export const userController = {
  /**
   * Returns metadata about available user-related routes.
   *
   * @param _req - Express request object
   * @param res - Express response object
   */
  index: (_req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
      resource: 'users',
      description: 'Endpoints for managing and retrieving users',
      endpoints: [
        {
          method: 'GET',
          path: '/users',
          description: 'Retrieve all users',
        },
        {
          method: 'GET',
          path: '/users/:id',
          description: 'Retrieve a user by their ID',
        },
        {
          method: 'GET',
          path: '/users/by-email',
          description: 'Retrieve a user by their email address',
        },
        {
          method: 'POST',
          path: '/users',
          description: 'Create a new user',
        },
        {
          method: 'POST',
          path: '/users/change-password',
          description: 'Update user password via recovery flow or settings',
        },
        {
          method: 'POST',
          path: '/users/change-username',
          description: 'Update user public username',
        },
      ],
    })
  },

  /**
   * Retrieves all users from the database.
   *
   * @param _req - Express request object (unused)
   * @param res - Express response object
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
   */
  getById: async (req: Request, res: Response): Promise<void> => {
    const id = parseOrThrow(UserIdSchema, req.params.id)
    const user = await userService.getUserById(id)
    res.status(HTTP_STATUS.OK).json(user)
  },

  /**
   * Retrieves a user by their email address.
   *
   * @param req - Express request object with `email` as query param
   * @param res - Express response object
   */
  getByEmail: async (req: Request, res: Response): Promise<void> => {
    const email = parseOrThrow(UserEmailSchema, req.query.email)
    const user = await userService.getUserByEmail(email)
    res.status(HTTP_STATUS.OK).json(user)
  },

  /**
   * Retrieves the currently authenticated user from the JWT.
   *
   * @param req - Express request object with `req.token` already populated
   * @param res - Express response object
   */
  getMe: async (req: Request, res: Response): Promise<void> => {
    const userId = parseOrThrow(UserIdSchema, req.token.sub)
    const user = await userService.getMe(userId)
    res.status(HTTP_STATUS.OK).json(user)
  },

  /**
   * Creates a new user if the email and username are not already in use.
   *
   * @param req - Express request object containing user data in the body
   * @param res - Express response object
   */
  create: async (req: Request, res: Response): Promise<void> => {
    const userData = parseOrThrow(CreateUserSchema, req.body)
    const user = await userService.createUser(userData)
    res.status(HTTP_STATUS.CREATED).json(user)
  },

  /**
   * Updates a user's password.
   *
   * @param req - Express request with userId and new password
   * @param res - Express response with 204 No Content
   */
  changePassword: async (req: Request, res: Response): Promise<void> => {
    const input = parseOrThrow(ChangePasswordSchema, req.body)
    await userService.changePassword(input)
    res.status(HTTP_STATUS.NO_CONTENT).send()
  },

  /**
   * Updates a user's username.
   *
   * @param req - Express request with userId and new username
   * @param res - Express response with 204 No Content
   */
  changeUsername: async (req: Request, res: Response): Promise<void> => {
    const input = parseOrThrow(ChangeUsernameSchema, req.body)
    await userService.changeUsername(input)
    res.status(HTTP_STATUS.NO_CONTENT).send()
  },
}
