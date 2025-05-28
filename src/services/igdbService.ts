import { assertExists, assertValid, buildIGDBQuery, extractErrorMessage, postToIGDB } from '@utils/index'
import { IGDBGame, IGDBGameFilters, IGDBGameSchema } from '@schemas/index'
import { HTTP_STATUS, IGDB } from '@constants/index'
import { ApiError } from '@errors/index'
import axios from 'axios'

let accessToken: string | null = null
let tokenExpiresAt: number | null = null

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

    const params = new URLSearchParams({
      client_id: IGDB.CLIENT_ID,
      client_secret: IGDB.CLIENT_SECRET,
      grant_type: 'client_credentials',
    })

    try {
      const { data } = await axios.post(IGDB.TOKEN_URL, params)
      const token = assertExists(data?.access_token, 'IGDB access token not returned')

      accessToken = token
      tokenExpiresAt = now + data.expires_in * 1000

      return token
    } catch (error: unknown) {
      const message = extractErrorMessage(error)
      throw new ApiError(`IGDB authentication failed: ${message}`, HTTP_STATUS.UNAUTHORIZED)
    }
  },

  /**
   * Executes a search query against the IGDB API using filter options,
   * and returns a validated list of games.
   *
   * Internally builds a query string using the `buildIGDBQuery` utility based on
   * the provided filters (search term, rating, genres, platforms, etc.).
   *
   * @param filters - Filtering and sorting options to apply to the IGDB API query.
   * @returns A validated array of `IGDBGame` objects.
   * @throws ApiError - If the API request fails or the response is invalid.
   */
  async searchGames(filters: IGDBGameFilters): Promise<IGDBGame[]> {
    try {
      const token = await igdbService.getAccessToken()
      const query = buildIGDBQuery(filters)

      console.log('[IGDB QUERY BODY]')
      console.log(query)

      const { data } = await postToIGDB<IGDBGame[]>(query, token)

      return assertValid(IGDBGameSchema.array(), data, 'Invalid IGDB response')
    } catch (error: unknown) {
      const message = extractErrorMessage(error)
      throw new ApiError(`Error searching games. ${message}`, HTTP_STATUS.BAD_GATEWAY)
    }
  },

  /**
   * Fetches and validates a single game by its IGDB numeric ID.
   *
   * Builds a query using `buildIGDBQuery` with a custom `where` clause to
   * request a single game. Validates the response structure using Zod.
   *
   * @param igdbId - The numeric IGDB ID of the game to retrieve.
   * @returns A validated `IGDBGame` object.
   * @throws ApiError - If the game is not found or the response is invalid.
   */
  async getGameById(igdbId: number): Promise<IGDBGame> {
    try {
      const token = await igdbService.getAccessToken()
      const query = buildIGDBQuery({ where: `id = ${igdbId}`, limit: 1 })
      const { data } = await postToIGDB<IGDBGame[]>(query, token)

      const game = assertExists(data?.[0], `Game with ID ${igdbId} not found`)

      return assertValid(IGDBGameSchema, game, 'Invalid game structure')
    } catch (error: unknown) {
      const message = extractErrorMessage(error)
      throw new ApiError(`Error fetching game by ID: ${message}`, HTTP_STATUS.BAD_GATEWAY)
    }
  },
}
