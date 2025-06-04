import { IGDBGame, IGDBGameFilters } from '@trackplay/core/schemas'
import { HTTP_STATUS, IGDB } from '@trackplay/core/constants'
import { ApiError } from '@trackplay/core/errors'
import { apiFetch } from '@trackplay/core/utils'

const API_URL = IGDB.API_URL

/**
 * IGDB game provider that communicates with the IGDB microservice via HTTP.
 *
 * Used internally by the backend to delegate game operations to the IGDB service.
 *
 * @module services/providers
 */
export const igdbGameProvider = {
  /**
   * Search for games from the IGDB microservice based on filters.
   *
   * @param filters - Filtering and sorting options for the search.
   * @returns A validated list of IGDBGame objects.
   */
  search: async (filters: IGDBGameFilters): Promise<IGDBGame[]> => {
    try {
      return await apiFetch.post<IGDBGame[]>(`${API_URL}/games/search`, {
        filters,
      })
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Error searching games', HTTP_STATUS.BAD_GATEWAY, error)
    }
  },

  /**
   * Fetch a single game by ID from the IGDB microservice.
   *
   * @param id - IGDB numeric ID of the game.
   * @returns The validated game object, or null if not found.
   */
  getByIgdbId: async (id: number): Promise<IGDBGame | null> => {
    try {
      return await apiFetch.get(`${API_URL}/games/${id}`)
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError('Error fetching game by ID', HTTP_STATUS.BAD_GATEWAY, error)
    }
  },
}
