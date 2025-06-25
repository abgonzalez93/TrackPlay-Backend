import {
  TokenGenerationInput,
  RefreshTokenRevokeInput,
  RefreshTokenRotationInput,
  SignedTokenPair,
} from '@trackplay/core/schemas'
import { apiFetch } from '@trackplay/core/utils'
import { getEnvConfig } from '@config/config'

const { AUTH_API_URL, AUTH_SECRET_KEY } = getEnvConfig

/**
 * HTTP client for interacting with the Auth microservice.
 *
 * Provides methods to generate, revoke, and rotate JWT token pairs.
 * All requests include the internal authorization token via `x-auth-token` header.
 */
export const authClient = {
  /**
   * Request a new access and refresh token pair for a user.
   *
   * @param input - Object containing the user ID (`sub`) to include in the token payload.
   * @returns A pair of signed JWTs (access + refresh).
   */
  generateTokens: async (input: TokenGenerationInput): Promise<SignedTokenPair> => {
    return await apiFetch.post<SignedTokenPair>(`${AUTH_API_URL}/auth/tokens`, {
      body: JSON.stringify(input),
      headers: {
        'x-auth-token': AUTH_SECRET_KEY,
      },
    })
  },

  /**
   * Revoke a refresh token by blacklisting its `jti` until expiration.
   *
   * @param token - Object containing the token ID (`jti`) and expiration timestamp (`exp`).
   * @returns A void Promise indicating completion.
   */
  revokeRefreshToken: async (token: RefreshTokenRevokeInput): Promise<void> => {
    return await apiFetch.post(`${AUTH_API_URL}/auth/revoke`, {
      body: JSON.stringify(token),
      headers: {
        'x-auth-token': AUTH_SECRET_KEY,
      },
    })
  },

  /**
   * Rotate a refresh token by revoking the current one and issuing a new pair.
   *
   * @param payload - Object containing `sub`, `jti`, and `exp` of the current token.
   * @returns A new pair of signed JWTs (access + refresh).
   */
  rotateTokens: async (payload: RefreshTokenRotationInput): Promise<SignedTokenPair> => {
    return await apiFetch.post<SignedTokenPair>(`${AUTH_API_URL}/auth/rotate`, {
      body: JSON.stringify(payload),
      headers: {
        'x-auth-token': AUTH_SECRET_KEY,
      },
    })
  },
}
