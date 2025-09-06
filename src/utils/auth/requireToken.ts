import { AuthorizationHeaderSchema, JWTPayloadUnionSchema } from '@trackplay/core/schemas'
import { UnauthorizedError } from '@trackplay/core/errors'
import { Request, Response, NextFunction } from 'express'
import { parseOrThrow } from '@trackplay/core/utils'
import { verifyToken } from './index'

const path = 'backend.utils.auth.requireToken'

/**
 * Middleware to require a valid JWT (access or refresh).
 * Attaches `req.token` with the parsed payload.
 */
export const requireToken = async (req: Request, _res: Response, next: NextFunction, tokenType: 'access' | 'refresh') => {
  const tokenLabel = tokenType === 'access' ? 'Access token' : 'Refresh token'

  const rawHeader = Array.isArray(req.headers.authorization) ? req.headers.authorization[0] : req.headers.authorization
  if (!rawHeader)
    throw new UnauthorizedError({
      key: `${path}.token_missing`,
      variables: { token: tokenLabel },
    })

  const header = parseOrThrow(
    AuthorizationHeaderSchema,
    rawHeader,
    {
      key: `${path}.token_header_invalid`,
      variables: { token: tokenLabel },
    },
    UnauthorizedError,
  )

  const jwt = header.replace(/^Bearer\s+/i, '').trim()

  const payload = await verifyToken(jwt, tokenType)
  const validPayload = parseOrThrow(
    JWTPayloadUnionSchema,
    payload,
    {
      key: `${path}.token_payload_invalid`,
      variables: { token: tokenLabel },
    },
    UnauthorizedError,
  )

  req.token = validPayload
  next()
}
