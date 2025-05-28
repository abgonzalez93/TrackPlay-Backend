import { EnvError } from '@errors/index'

/**
 * Environment configuration loader.
 * Loads required environment variables and provides fallbacks for development.
 *
 * @module utils/env
 */
const required = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new EnvError(name)
  return value
}

/**
 * Environment configuration.
 *
 * Centralized access to all environment variables used in the application,
 * including runtime flags and required external service credentials.
 *
 * Each variable is either loaded directly from `process.env`, has a default fallback,
 * or is enforced as required using the `required` function.
 *
 * @module config/env
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',

  HOST: process.env.HOST || '0.0.0.0',
  PORT: parseInt(process.env.PORT || '4000', 10),

  IGDB_CLIENT_ID: required('IGDB_CLIENT_ID'),
  IGDB_CLIENT_SECRET: required('IGDB_CLIENT_SECRET'),
  IGDB_TOKEN_URL: process.env.IGDB_TOKEN_URL || 'https://id.twitch.tv/oauth2/token',
  IGDB_API_URL: process.env.IGDB_API_URL || 'https://api.igdb.com/v4',
}
