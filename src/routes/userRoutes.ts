import { userController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for user endpoints.
 */
export const userRoutes = Router()

userRoutes.get('/', userController.getAll)
userRoutes.get('/:id', userController.getById)
userRoutes.get('/by-email', userController.getByEmail)
userRoutes.post('/', userController.create)
