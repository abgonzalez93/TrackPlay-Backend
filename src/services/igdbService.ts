import { IGDBGame, IGDBGameSchema } from '@schemas/index'
import { assertExists, assertValid } from '@utils/index'
import { httpStatus } from '@constants/httpStatus'
import { ApiError } from '@errors/index'
import { env } from '@config/index'
import axios from 'axios'

let accessToken: string | null = null
let tokenExpiresAt: number | null = null

/**
 * Extracts a user-friendly error message from an unknown error.
 *
 * @param error - The error thrown
 * @returns A formatted string message
 */
const extractErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message ?? error.message
  }

  return (error as Error)?.message ?? 'Unexpected error'
}

/**
 * Sends a POST request to the IGDB API using the given query and token.
 *
 * @param query - IGDB query string in plain text format
 * @param token - OAuth bearer token for IGDB authentication
 * @returns Axios response containing raw IGDB data
 * @throws AxiosError if the request fails
 * @private
 */
const postToIGDB = async (query: string, token: string) => {
  return axios.post(`${env.IGDB_API_URL}/games`, query, {
    headers: {
      'Client-ID': env.IGDB_CLIENT_ID,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'text/plain',
    },
  })
}

/**
 * Service for authenticating and retrieving game data from IGDB.
 *
 * @module services
 */
export const igdbService = {
  /**
   * Retrieves and caches a valid OAuth token from the Twitch/IGDB API.
   * If a cached token is still valid, it is reused.
   *
   * @returns A valid bearer token for IGDB requests
   * @throws ApiError if the token cannot be obtained
   */
  async getAccessToken(): Promise<string> {
    const now = Date.now()

    if (accessToken && tokenExpiresAt && now < tokenExpiresAt) {
      return accessToken
    }

    console.log('CLIENT_ID', env.IGDB_CLIENT_ID)
    console.log('CLIENT_SECRET', env.IGDB_CLIENT_SECRET)

    const params = new URLSearchParams({
      client_id: env.IGDB_CLIENT_ID,
      client_secret: env.IGDB_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })

    try {
      const { data } = await axios.post(env.IGDB_TOKEN_URL, params)
      const token = assertExists(data?.access_token, 'IGDB access token not returned')

      accessToken = token
      tokenExpiresAt = now + data.expires_in * 1000

      return token
    } catch (error: unknown) {
      const message = extractErrorMessage(error)
      throw new ApiError(`IGDB authentication failed: ${message}`, httpStatus.UNAUTHORIZED)
    }
  },

  /**
   * Executes a search query against the IGDB API using its query syntax,
   * and returns a validated list of games.
   *
   * @param query - IGDB query string (e.g. "search \"Zelda\"; fields name;")
   * @returns An array of valid `IGDBGame` objects
   * @throws ApiError if the request fails or the response is invalid
   */
  async searchGames(query: string): Promise<IGDBGame[]> {
    try {
      const token = await igdbService.getAccessToken()
      const { data } = await postToIGDB(query, token)

      return assertValid(IGDBGameSchema.array(), data, 'Invalid IGDB response')
    } catch (error: unknown) {
      const message = extractErrorMessage(error)
      throw new ApiError(`Error searching games. ${message}`, httpStatus.BAD_GATEWAY)
    }
  },

  /**
   * Fetches and validates a single game by its IGDB numeric ID.
   *
   * @param igdbId - The IGDB game ID to retrieve
   * @returns A valid `IGDBGame` object
   * @throws ApiError if the game is not found or response is invalid
   */
  async getGameById(igdbId: number): Promise<IGDBGame> {
    try {
      const token = await igdbService.getAccessToken()

      const query = `
        fields id, name, slug, summary, storyline, cover.url,
        first_release_date, genres.name, platforms.name,
        rating, total_rating, screenshots.url, videos.video_id, url;
        where id = ${igdbId};
      `.trim()

      const { data } = await postToIGDB(query, token)

      const game = assertExists(data?.[0], `Game with ID ${igdbId} not found`)
      return assertValid(IGDBGameSchema, game, 'Invalid game structure')
    } catch (error: unknown) {
      const message = extractErrorMessage(error)
      throw new ApiError(`Error fetching game by ID: ${message}`, httpStatus.BAD_GATEWAY)
    }
  },
}
