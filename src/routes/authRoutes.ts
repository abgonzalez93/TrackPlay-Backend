import { requireRefreshToken } from '@middlewares/index'
import { authController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for auth endpoints.
 */
export const authRoutes = Router()

authRoutes.get('/meta', authController.index)
authRoutes.post('/login', authController.login)
authRoutes.post('/logout', requireRefreshToken, authController.logout)
authRoutes.post('/refresh', requireRefreshToken, authController.refresh)
authRoutes.post('/forgot-password', authController.forgotPassword)
