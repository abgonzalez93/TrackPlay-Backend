import { requireAccessToken, requireRefreshToken } from '@middlewares/index'
import { userController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for user endpoints.
 */
export const userRoutes = Router()

userRoutes.get('/meta', userController.index)
userRoutes.get('/', userController.getAll)
userRoutes.get('/:id', userController.getById)
userRoutes.get('/by-email', requireAccessToken, userController.getByEmail)
userRoutes.get('/me', requireAccessToken, userController.getMe)
userRoutes.post('/', userController.create)
userRoutes.post('/change-password', requireRefreshToken, userController.changePassword)
userRoutes.post('/change-username', requireRefreshToken, userController.changeUsername)
