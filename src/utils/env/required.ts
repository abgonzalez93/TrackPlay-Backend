import { EnvError } from '@errors/index'

/**
 * Environment configuration loader.
 * Loads required environment variables and provides fallbacks for development.
 *
 * @module utils/env
 */
export const required = (name: string): string => {
  const value = process.env[name]
  if (!value) throw new EnvError(name)
  return value
}
