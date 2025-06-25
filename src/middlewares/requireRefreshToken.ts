import { Request, Response, NextFunction } from 'express'
import { requireToken } from '@utils/index'

/**
 * Express middleware to require a valid **refresh token**.
 *
 * Verifies the Authorization header, checks the JWT signature and type,
 * and attaches the decoded payload to `req.token`.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const requireRefreshToken = (req: Request, res: Response, next: NextFunction) =>
  requireToken(req, res, next, 'refresh')
