import { UnauthorizedError } from '@trackplay/core/errors'
import { JWT } from '@trackplay/core/constants'
import { jwtVerify, JWTPayload } from 'jose'
import { createPublicKey } from 'crypto'
import { readFileSync } from 'fs'
import path from 'path'

const publicKeyPath = path.resolve('/app/.files/jwt/public.key')
const publicKey = createPublicKey(readFileSync(publicKeyPath, 'utf8'))

/**
 * Verifies a JWT and ensures it matches the expected type ('access' or 'refresh').
 *
 * @param token - JWT string to verify
 * @param expectedType - Expected value of the 'typ' claim
 * @returns Decoded and validated JWT payload
 * @throws UnauthorizedError if the token is invalid, expired or of incorrect type
 */
export const verifyToken = async (token: string, expectedType: 'access' | 'refresh'): Promise<JWTPayload> => {
  try {
    const { payload } = await jwtVerify(token, publicKey, {
      issuer: JWT.ISSUER,
      algorithms: [JWT.ALGORITHM],
    })

    if (payload.typ !== expectedType) throw new UnauthorizedError(`Invalid token type: expected '${expectedType}'`)

    return payload
  } catch (error: unknown) {
    throw new UnauthorizedError('Invalid or expired token', error)
  }
}

/**
 * Verifies an access token.
 *
 * @param token - Access token string
 * @returns Decoded payload if valid
 */
export const verifyAccessToken = (token: string): Promise<JWTPayload> => verifyToken(token, 'access')

/**
 * Verifies a refresh token.
 *
 * @param token - Refresh token string
 * @returns Decoded payload if valid
 */
export const verifyRefreshToken = (token: string): Promise<JWTPayload> => verifyToken(token, 'refresh')
