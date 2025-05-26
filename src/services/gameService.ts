import { igdbService } from '@services/igdbService'
import { IGDBGame } from '@schemas/index'

/**
 * Service for handling game-related operations.
 * Currently powered entirely by the IGDB external API.
 *
 * @module services/gameService
 */
export const gameService = {
  /**
   * Search for games from the IGDB API based on a query string.
   *
   * @param query - The game title or keyword to search for.
   * @returns A list of games matching the query.
   */
  search: (query: string): Promise<IGDBGame[]> =>
    igdbService.searchGames(query),

  /**
   * Fetch a single game from the IGDB API using its IGDB ID.
   *
   * @param igdbId - The IGDB ID of the game to retrieve.
   * @returns The game data or null if not found.
   */
  getByIgdbId: (igdbId: number): Promise<IGDBGame | null> =>
    igdbService.getGameById(igdbId),
}
