import { getBaseURL } from '@utils/index'
import { logger } from '@logger/index'
import { env } from '@config/index'
import app from './app'

/**
 * Entry point for the application.
 * Starts the HTTP server and logs startup info.
 *
 * @module server
 */
app.listen(env.PORT, env.HOST, () => {
  logger.info(`🚀 Server running at ${getBaseURL()}`)
})
