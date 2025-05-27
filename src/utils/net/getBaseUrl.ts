import { env } from '@config/index'

/**
 * Computes the base URL of the application based on environment settings.
 *
 * Uses `env.HOST`, `env.PORT` and `env.IS_PRODUCTION` by default.
 *
 * @returns The full base URL (e.g., http://localhost:4000).
 *
 * @module utils/net
 */
export const getBaseURL = (): string => {
  const protocol = env.IS_PRODUCTION ? 'https' : 'http'
  return `${protocol}://${env.HOST}:${env.PORT}`
}
