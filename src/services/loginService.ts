import { ForgotPasswordInput, LoginInput, LoginResponse } from '@trackplay/core/schemas'
import { authService, userService } from './index'
import { verifyPassword } from '@utils/index'

/**
 * Service for handling user authentication logic.
 * Includes login verification and credential-based operations.
 */
export const loginService = {
  /**
   * Authenticates a user using email and password credentials.
   *
   * @param input - Object containing the user's email and password
   * @returns An object containing the signed token pair and public user information
   */
  login: async (input: LoginInput): Promise<LoginResponse> => {
    const { identifier, password } = input
    const user = await userService.getUserForAuth(identifier)
    verifyPassword(password, user.password)

    const tokens = await authService.generateTokens({ sub: user.id.toString() })

    return {
      tokens,
    }
  },

  /**
   * Initiates the password recovery flow for a user.
   *
   * Sends a recovery email to the provided address if associated with a registered account.
   *
   * @param input - Object containing the user's email address
   */
  forgotPassword: async (input: ForgotPasswordInput): Promise<void> => {
    // TODO: Implement sending recovery token/email
  },
}
