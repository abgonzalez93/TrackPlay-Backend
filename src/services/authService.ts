import {
  TokenGenerationInput,
  RefreshTokenRevokeInput,
  RefreshTokenRotationInput,
  SignedTokenPair,
} from '@trackplay/core/schemas'
import { authClient } from '@services/index'

/**
 * Service for handling authentication-related operations.
 * Delegates token handling to the external Auth microservice.
 */
export const authService = {
  /**
   * Request a new access and refresh token pair for a user.
   *
   * @param input - Object containing the user ID (`sub`) to include in the token payload.
   * @returns A pair of signed JWTs (access + refresh).
   */
  generateTokens: async (input: TokenGenerationInput): Promise<SignedTokenPair> => await authClient.generateTokens(input),

  /**
   * Revoke a refresh token by blacklisting its `jti` until expiration.
   *
   * @param token - Object containing the token ID (`jti`) and expiration timestamp (`exp`).
   * @returns A void Promise indicating completion.
   */
  revokeRefreshToken: async (token: RefreshTokenRevokeInput): Promise<void> => await authClient.revokeRefreshToken(token),

  /**
   * Rotate a refresh token by revoking the current one and issuing a new pair.
   *
   * @param payload - Object containing `sub`, `jti`, and `exp` of the current token.
   * @returns A new pair of signed JWTs (access + refresh).
   */
  rotateTokens: async (payload: RefreshTokenRotationInput): Promise<SignedTokenPair> =>
    await authClient.rotateTokens(payload),
}
