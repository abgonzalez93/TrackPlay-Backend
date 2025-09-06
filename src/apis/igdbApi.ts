import { IGDBGame, IGDBGameFilters } from '@trackplay/core/schemas'
import { apiFetch } from '@trackplay/core/utils'
import { getEnvConfig } from '@config/index'

const { IGDB_API_URL } = getEnvConfig

/**
 * IGDB game client that communicates with the IGDB microservice via HTTP.
 *
 * Used internally by the backend to delegate game operations to the IGDB service.
 */
export const igdbApi = {
  /**
   * Search for games from the IGDB microservice based on filters.
   *
   * @param filters - Filtering and sorting options for the search.
   * @returns A validated list of IGDBGame objects.
   */
  search: async (filters: IGDBGameFilters): Promise<IGDBGame[]> => {
    return await apiFetch.post<IGDBGame[]>(`${IGDB_API_URL}/games/search`, {
      filters,
    })
  },

  /**
   * Fetch a single game by ID from the IGDB microservice.
   *
   * @param id - IGDB numeric ID of the game.
   * @returns The validated game object.
   */
  getByIgdbId: async (id: number): Promise<IGDBGame> => {
    return await apiFetch.get(`${IGDB_API_URL}/games/${id}`)
  },
}
