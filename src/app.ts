import { registerMiddlewares, errorHandler } from '@middlewares/index'
import { registerRoutes } from '@routes/index'
import express from 'express'

/**
 * Main Express application setup.
 *
 * @module app
 */
const app = express()

registerMiddlewares(app)
registerRoutes(app)
app.use(errorHandler)

export default app
