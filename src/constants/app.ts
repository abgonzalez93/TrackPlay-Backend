import { env } from '@config/index'

/**
 * Application-level constants and environment flags.
 *
 * @module constants
 */
export const APP = {
  NODE_ENV: env.NODE_ENV,
  IS_PRODUCTION: env.IS_PRODUCTION,
  IS_DEVELOPMENT: env.IS_DEVELOPMENT,
  HOST: env.HOST,
  PORT: env.PORT,
}
