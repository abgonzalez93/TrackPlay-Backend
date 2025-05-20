import { logger } from '@logger/index'
import { env } from '@config/index'
import app from './app'

/**
 * Entry point for the application. Starts the HTTP server.
 *
 * @module server
 */
app.listen(env.PORT, () => {
  logger.info(`🚀 Server running at http://localhost:${env.PORT}`)
})
