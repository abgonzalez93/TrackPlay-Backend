import { userRoutes, gameRoutes, trackGameRoutes, rootRoutes } from '@routes/index'
import { Express } from 'express'

/**
 * Registers all application routes.
 *
 * @param app - The Express application instance
 */
export const routes = (app: Express): void => {
  app.use('/', rootRoutes)
  app.use('/users', userRoutes)
  app.use('/games', gameRoutes)
  app.use('/track-games', trackGameRoutes)
}
