import { AuthorizationHeader, AuthorizationHeaderSchema, JWTPayload, JWTPayloadUnionSchema } from '@trackplay/core/schemas'
import { UnauthorizedError } from '@trackplay/core/errors'
import { Request, Response, NextFunction } from 'express'
import { parseOrThrow } from '@trackplay/core/utils'
import { verifyToken } from './index'

/**
 * Middleware to require a valid JWT (access or refresh).
 * Attaches `req.token` with the parsed payload.
 */
export const requireToken = async (req: Request, _res: Response, next: NextFunction, tokenType: 'access' | 'refresh') => {
  const tokenLabel = tokenType === 'access' ? 'Access token' : 'Refresh token'

  const rawHeader = Array.isArray(req.headers.authorization) ? req.headers.authorization[0] : req.headers.authorization
  if (!rawHeader) throw new UnauthorizedError(`${tokenLabel} is missing`)

  const header = parseOrThrow<AuthorizationHeader>(
    AuthorizationHeaderSchema,
    rawHeader,
    `${tokenLabel} header is invalid`,
    UnauthorizedError,
  )

  const jwt = header.replace(/^Bearer\s+/i, '').trim()
  const payload = await verifyToken(jwt, tokenType)

  const validPayload = parseOrThrow<JWTPayload>(
    JWTPayloadUnionSchema,
    payload,
    `${tokenLabel} payload is invalid`,
    UnauthorizedError,
  )

  req.token = validPayload
  next()
}
