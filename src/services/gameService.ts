import { Game, GameFilters, GameId, GameList } from '@trackplay/core/schemas'
import { GAME } from '@trackplay/core/constants'
import { igdbApi } from '@apis/index'

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
  search: async (filters: GameFilters): Promise<GameList> => {
    const limit = Math.min(filters.limit ?? GAME.MAX_GAME_LIMIT, 100)

    return await igdbApi.search({
      ...filters,
      limit,
    })
  },

  /**
   * Lists popular games using default filters.
   * Internally calls `search` with predefined values.
   *
   * @returns A list of popular games.
   */
  list: async (): Promise<GameList> =>
    await gameService.search({
      sortBy: 'rating',
      sortOrder: 'desc',
    }),

  /**
   * Retrieves a single game from the IGDB API using its IGDB ID.
   *
   * @param id - The IGDB ID of the game to retrieve.
   * @returns The matching game object.
   */
  getByIgdbId: async (id: GameId): Promise<Game> => await igdbApi.getByIgdbId(id),
}
