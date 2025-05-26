import { userRoutes, gameRoutes, trackGameRoutes } from '@routes/index'
import { Express } from 'express'

/**
 * Registers all application routes.
 *
 * @param app - The Express application instance
 * @module routes/routes
 */
export const routes = (app: Express): void => {
  app.use('/users', userRoutes)
  app.use('/games', gameRoutes)
  app.use('/track-games', trackGameRoutes)
}
