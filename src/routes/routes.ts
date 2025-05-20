/**
 * Registers all application routes.
 *
 * @module routes/routes
 */
import { Express } from 'express'
import { userRoutes } from './userRoutes'

export const registerRoutes = (app: Express): void => {
  app.use('/api/users', userRoutes)
}
