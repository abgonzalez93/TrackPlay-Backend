import { IGDBGame, IGDBGameFilters, IGDBId } from '@trackplay/core/schemas'
import { igdbGameClient } from '@services/index'

/**
 * Service for handling game-related operations.
 * Currently powered entirely by the IGDB external API.
 */
export const gameService = {
  /**
   * Search for games from the IGDB API based on filters.
   *
   * @param filters - Filtering and sorting options for the search.
   * @returns A list of games matching the criteria.
   */
  search: async (filters: IGDBGameFilters): Promise<IGDBGame[]> => await igdbGameClient.search(filters),

  /**
   * Retrieves a single game from the IGDB API using its IGDB ID.
   *
   * @param id - The IGDB ID of the game to retrieve.
   * @returns The matching game object.
   */
  getByIgdbId: async (id: IGDBId): Promise<IGDBGame> => await igdbGameClient.getByIgdbId(id),
}
