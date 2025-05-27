/**
 * Application-level constants and environment flags.
 *
 * @module constants
 */
export const APP = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',

  HOST: process.env.HOST || '0.0.0.0',
  PORT: parseInt(process.env.PORT || '4000', 10),
}
