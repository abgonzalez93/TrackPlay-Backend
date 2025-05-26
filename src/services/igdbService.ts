import { IGDBGameSchema, IGDBGame } from '@schemas/index'
import { env } from '@config/index'
import axios from 'axios'

let accessToken: string | null = null
let tokenExpiresAt: number | null = null

/**
 * IGDB service for handling OAuth authentication and game data requests.
 *
 * @module services/igdbService
 */
export const igdbService = {
  /**
   * Retrieves and caches a valid OAuth access token from the Twitch API.
   *
   * If a token is already available and not expired, it returns the cached token.
   * Otherwise, it requests a new token using client credentials.
   *
   * @returns A promise that resolves to the access token as a string
   */
  getAccessToken: async (): Promise<string> => {
    const now = Date.now()

    if (accessToken && tokenExpiresAt && now < tokenExpiresAt) {
      return accessToken
    }

    const params = new URLSearchParams({
      client_id: env.IGDB_CLIENT_ID,
      client_secret: env.IGDB_CLIENT_SECRET,
      grant_type: 'client_credentials',
    })

    const { data } = await axios.post(env.IGDB_API_URL, params)

    accessToken = data.access_token
    tokenExpiresAt = now + data.expires_in * 1000

    return accessToken!
  },

  /**
   * Searches for games in the IGDB API based on a query string.
   *
   * This function uses the `search` operator provided by IGDB's query language.
   * It parses the response to ensure all games match the expected structure.
   *
   * @param query - The search term used to find matching games
   * @returns A promise resolving to an array of validated IGDBGame objects
   */
  searchGames: async (query: string): Promise<IGDBGame[]> => {
    const token = await igdbService.getAccessToken()

    const body = `
      search "${query}";
      fields id, name, slug, summary, storyline, cover.url,
      first_release_date, genres.name, platforms.name,
      rating, total_rating, screenshots.url, videos.video_id, url;
      limit 10;
    `

    const response = await axios.post(`${env.IGDB_API_URL}/games`, body, {
      headers: {
        'Client-ID': env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
    })

    const games = response.data
    return games
      .filter(IGDBGameSchema.safeParse)
      .map((game: unknown) => IGDBGameSchema.parse(game))
  },

  /**
   * Fetches a single game by its IGDB ID.
   *
   * Queries the IGDB API and returns the first matching game,
   * or null if no valid game is found.
   *
   * @param igdbId - The IGDB ID of the game to retrieve
   * @returns A promise resolving to a validated IGDBGame or null if not found
   */
  getGameById: async (igdbId: number): Promise<IGDBGame | null> => {
    const token = await igdbService.getAccessToken()

    const body = `
      fields id, name, slug, summary, storyline, cover.url,
      first_release_date, genres.name, platforms.name,
      rating, total_rating, screenshots.url, videos.video_id, url;
      where id = ${igdbId};
    `

    const response = await axios.post(`${env.IGDB_API_URL}/games`, body, {
      headers: {
        'Client-ID': env.IGDB_CLIENT_ID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain',
      },
    })

    const game = response.data?.[0]
    if (!game) return null

    return IGDBGameSchema.parse(game)
  },
}
