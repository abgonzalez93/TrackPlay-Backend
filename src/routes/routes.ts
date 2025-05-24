import { userRoutes } from '@routes/index'
import { Express } from 'express'

/**
 * Registers all application routes.
 *
 * @module routes/routes
 */
export const routes = (app: Express): void => {
  app.use('/users', userRoutes)
}
