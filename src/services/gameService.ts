import { IGDBGame, IGDBGameFilters } from '@gametrackr-core/schemas'
import { igdbService } from '@services/index'

/**
 * Service for handling game-related operations.
 * Currently powered entirely by the IGDB external API.
 *
 * @module services
 */
export const gameService = {
  /**
   * Search for games from the IGDB API based on filters.
   *
   * @param filters - Filtering and sorting options for the search.
   * @returns A list of games matching the criteria.
   */
  search: (filters: IGDBGameFilters): Promise<IGDBGame[]> => igdbService.searchGames(filters),

  /**
   * Fetch a single game from the IGDB API using its IGDB ID.
   *
   * @param igdbId - The IGDB ID of the game to retrieve.
   * @returns The game data or null if not found.
   */
  getByIgdbId: (igdbId: number): Promise<IGDBGame | null> => igdbService.getGameById(igdbId),
}
