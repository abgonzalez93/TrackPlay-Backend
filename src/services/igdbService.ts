import { IGDBGame, IGDBGameSchema } from '@schemas/index'
import { assertExists, assertValid } from '@utils/index'
import { env } from '@config/index'
import axios from 'axios'

let accessToken: string | null = null
let tokenExpiresAt: number | null = null

/**
 * Sends a POST request to the IGDB API with proper headers.
 *
 * @param query - IGDB query string in plain text
 * @param token - OAuth token
 * @returns Axios response with data
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
 * Service to authenticate and fetch games from the IGDB API.
 *
 * @module services/igdbService
 */
export const igdbService = {
  /**
   * Retrieves a valid and cached OAuth token from Twitch.
   *
   * @returns Valid access token
   * @throws ApiError if the token cannot be retrieved
   */
  async getAccessToken(): Promise<string> {
    const now = Date.now()

    if (accessToken && tokenExpiresAt && now < tokenExpiresAt) {
      return accessToken
    }

    const params = new URLSearchParams({
      client_id: env.IGDB_CLIENT_ID,
      client_secret: env.IGDB_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })

    const { data } = await axios.post(env.IGDB_TOKEN_URL, params)

    const token = assertExists(data?.access_token, 'IGDB access token not returned')

    accessToken = token
    tokenExpiresAt = now + data.expires_in * 1000

    return token
  },

  /**
   * Search games using IGDB’s query syntax and validate the response.
   *
   * @param query - IGDB plain-text query string
   * @returns Valid array of IGDBGame
   * @throws ApiError if validation fails
   */
  async searchGames(query: string): Promise<IGDBGame[]> {
    const token = await igdbService.getAccessToken()
    const { data } = await postToIGDB(query, token)

    return assertValid(IGDBGameSchema.array(), data, 'Invalid IGDB response')
  },

  /**
   * Fetches a single game by its IGDB ID and validates it.
   *
   * @param igdbId - IGDB game ID
   * @returns IGDBGame if found
   * @throws ApiError if not found or invalid
   */
  async getGameById(igdbId: number): Promise<IGDBGame> {
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
  },
}
