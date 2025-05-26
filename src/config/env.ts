/**
 * Environment configuration loader.
 * Loads required environment variables and provides fallbacks for development.
 *
 * @module config/env
 */
const required = (name: string): string => {
  const value = process.env[name]

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

/**
 * Environment configuration loader.
 * Loads required environment variables and provides fallbacks for development.
 *
 * @module config/env
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',

  HOST: process.env.HOST || '0.0.0.0',
  PORT: parseInt(process.env.PORT || '4000', 10),

  DATABASE_URL: required('DATABASE_URL'),

  IGDB_CLIENT_ID: required('IGDB_CLIENT_ID'),
  IGDB_CLIENT_SECRET: required('IGDB_CLIENT_SECRET'),
  IGDB_TOKEN_URL: 'https://id.twitch.tv/oauth2/token',
  IGDB_API_URL: 'https://api.igdb.com/v4',
}
