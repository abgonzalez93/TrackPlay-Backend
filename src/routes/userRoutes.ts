import { userController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for user endpoints.
 *
 * @module routes
 */
export const userRoutes = Router()

userRoutes.get('/', userController.getAll)
userRoutes.get('/:id', userController.getById)
userRoutes.post('/', userController.create)
