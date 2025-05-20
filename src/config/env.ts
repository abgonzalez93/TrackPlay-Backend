/**
 * Environment configuration loader.
 * Loads required environment variables and provides fallbacks for development.
 *
 * @module config/env
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  DATABASE_URL: process.env.DATABASE_URL || '',
}
