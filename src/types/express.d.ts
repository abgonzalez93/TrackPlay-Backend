import { JWTPayload } from '@trackplay/core/schemas'

declare global {
  namespace Express {
    interface Request {
      token: JWTPayload
    }
  }
}
