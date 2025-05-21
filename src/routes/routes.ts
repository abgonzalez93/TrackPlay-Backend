import { userRoutes } from '@routes/index'
import { Express } from 'express'

/**
 * Registers all application routes.
 *
 * @module routes/routes
 */
export const registerRoutes = (app: Express): void => {
  app.use('/users', userRoutes)
}
