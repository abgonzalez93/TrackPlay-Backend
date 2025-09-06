import { ForgotPasswordSchema, LoginInputSchema } from '@trackplay/core/schemas'
import { authService, loginService } from '@services/index'
import { HTTP_STATUS } from '@trackplay/core/constants'
import { parseOrThrow } from '@trackplay/core/utils'
import { Request, Response } from 'express'

/**
 * Controller for handling authentication-related routes exposed to the frontend.
 */
export const authController = {
  /**
   * Returns metadata about available public authentication routes.
   *
   * @param _req - Express request object
   * @param res - Express response object
   */
  index: (_req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
      resource: 'auth',
      description: 'Public authentication endpoints',
      endpoints: [
        {
          method: 'POST',
          path: '/auth/login',
          description: 'Authenticate user and issue token pair',
        },
        {
          method: 'POST',
          path: '/auth/logout',
          description: 'Revoke a refresh token and log out user',
        },
        {
          method: 'POST',
          path: '/auth/refresh',
          description: 'Rotate refresh token and issue new pair',
        },
        {
          method: 'POST',
          path: '/auth/forgot-password',
          description: 'Send password recovery instructions to user email',
        },
      ],
    })
  },

  /**
   * Authenticates a user with email and password credentials.
   *
   * Validates the login input and returns a signed token pair along with public user data.
   *
   * @param req - Express request with email and password in the body
   * @param res - Express response with token pair and public user info
   */
  login: async (req: Request, res: Response): Promise<void> => {
    const input = parseOrThrow(LoginInputSchema, req.body)
    const result = await loginService.login(input)
    res.status(HTTP_STATUS.OK).json(result)
  },

  /**
   * Revoke a refresh token, effectively logging the user out.
   *
   * Requires a valid refresh token in the `Authorization` header.
   * The token is validated and parsed into `req.token` by the `requireRefreshToken` middleware.
   *
   * @param req - Express request object with a valid token payload (`jti`, `exp`) in `req.token`
   * @param res - Express response with 204 No Content if successful
   */
  logout: async (req: Request, res: Response): Promise<void> => {
    const { jti, exp } = req.token
    await authService.revokeRefreshToken({ jti, exp })
    res.status(HTTP_STATUS.NO_CONTENT).send()
  },

  /**
   * Refresh the user's session by rotating the current refresh token and issuing a new token pair.
   *
   * Requires a valid refresh token in the `Authorization` header.
   * The token is validated and parsed into `req.token` by the `requireRefreshToken` middleware.
   *
   * @param req - Express request object with a valid token payload (`sub`, `jti`, `exp`) in `req.token`
   * @param res - Express response with a new access and refresh token pair
   */
  refresh: async (req: Request, res: Response): Promise<void> => {
    const tokens = await authService.rotateTokens(req.token)
    res.status(HTTP_STATUS.OK).json(tokens)
  },

  /**
   * Initiates password recovery for a given email address.
   *
   * @param req - Express request with the user's email
   * @param res - Express response with 204 No Content
   */
  forgotPassword: async (req: Request, res: Response): Promise<void> => {
    const input = parseOrThrow(ForgotPasswordSchema, req.body)
    await loginService.forgotPassword(input)
    res.status(HTTP_STATUS.NO_CONTENT).send()
  },
}
