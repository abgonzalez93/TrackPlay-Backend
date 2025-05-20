import { Request, Response, NextFunction } from 'express'
import { CreateUserSchema } from '@schemas/index'
import { userService } from '@services/index'
import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'

/**
 * Controller for handling user-related requests.
 *
 * @module controllers/userController
 */
export const userController = {
  getAll: async (_req: Request, res: Response) => {
    const users = await userService.getAllUsers()
    res.json(users)
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id)
    const user = await userService.getUserById(id)
    if (!user) return next(new ApiError('User not found', httpStatus.NOT_FOUND))
    res.json(user)
  },

  create: async (req: Request, res: Response, next: NextFunction) => {
    const result = CreateUserSchema.safeParse(req.body)
    if (!result.success) return next(new ApiError('Invalid input', httpStatus.BAD_REQUEST))
    const newUser = await userService.createUser(result.data)
    res.status(httpStatus.CREATED).json(newUser)
  },
}
