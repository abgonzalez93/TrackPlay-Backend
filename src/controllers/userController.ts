import { CreateUserDTO, CreateUserDTOSchema } from '@dtos/index'
import { validateInput, checkConflict } from '@helpers/index'
import { Request, Response, NextFunction } from 'express'
import { userService } from '@services/index'
import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'

/**
 * Controller for handling user-related requests.
 *
 * @module controllers/userController
 */
export const userController = {
  getAll: async (_req: Request, res: Response): Promise<void> => {
    const users = await userService.getAllUsers()
    res.json(users)
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Number(req.params.id)
    const user = await userService.getUserById(id)

    if (!user) {
      return next(
        new ApiError('User not found', httpStatus.NOT_FOUND)
      )
    }

    res.json(user)
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
