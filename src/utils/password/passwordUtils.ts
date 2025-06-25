import { UnauthorizedError } from '@trackplay/core/errors'
import { getEnvConfig } from '@config/index'
import bcrypt from 'bcrypt'

const { SALT_ROUNDS } = getEnvConfig

/**
 * Hashes a raw password using bcrypt.
 *
 * @param password - Raw password to hash
 * @returns Hashed password
 */
export const hashPassword = async (password: string): Promise<string> => await bcrypt.hash(password, SALT_ROUNDS)

/**
 * Compares a plain password with its hashed counterpart.
 *
 * @param plain - Raw password provided by the user
 * @param hashed - Hashed password stored in the database
 * @throws {UnauthorizedError} If the password does not match
 */
export const verifyPassword = async (plain: string, hashed: string): Promise<void> => {
  const isValid = await bcrypt.compare(plain, hashed)
  if (!isValid) throw new UnauthorizedError('Invalid credentials')
}
