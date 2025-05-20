/**
 * Registers global middlewares for the Express app.
 *
 * @module middlewares/middlewares
 */
import { Express, json } from 'express'
import compression from 'compression'
import helmet from 'helmet'
import cors from 'cors'

export const registerMiddlewares = (app: Express): void => {
  app.use(helmet())
  app.use(cors())
  app.use(compression())
  app.use(json())
}
