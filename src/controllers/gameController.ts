import { IGDBGameFiltersSchema, IGDBGameFilters } from '@schemas/index'
import { assertValid, assertExists } from '@utils/index'
import { gameService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling routes related to games.
 *
 * @module controllers
 */
export const gameController = {
  /**
   * Returns basic API information for the /games endpoint,
   * including available routes, usage examples, and supported query parameters.
   *
   * @route GET /games
   * @param _req - Express request object
   * @param res - Express response object
   */
  index: (_req: Request, res: Response): void => {
    res.json({
      message: 'Welcome to the /games API',
      description:
        'This endpoint allows you to search and retrieve video games from the IGDB database.',
      availableRoutes: [
        {
          path: '/games',
          method: 'GET',
          description: 'Shows this documentation entry',
        },
        {
          path: '/games/search',
          method: 'GET',
          description: 'Search games using filters and full-text query',
        },
        {
          path: '/games/:id',
          method: 'GET',
          description: 'Fetch a game by its IGDB ID',
        },
      ],
      filters: {
        q: 'Full-text search by title or keywords (string)',
        limit: 'Number of results to return (number, min: 1, max: 100)',
        offset: 'Pagination offset (number, min: 0)',
        sortBy: 'Field to sort by (string)',
        sortOrder: '"asc" or "desc" (default: "desc")',
        minRating: 'Minimum average user rating (number, 0–100)',
        excludeThemes: 'Array of theme IDs to exclude (array of numbers)',
        platforms: 'Array of platform IDs to filter by (array of numbers)',
        genres: 'Array of genre IDs to filter by (array of numbers)',
      },
      examples: {
        search: '/games/search?q=zelda&limit=10&sortBy=rating&sortOrder=desc',
        getById: '/games/12345',
      },
    })
  },

  /**
   * Search games by query string.
   *
   * @route GET /games/search
   * @param req - Express request object
   * @param res - Express response object
   */
  search: async (req: Request, res: Response): Promise<void> => {
    const dto = assertValid<IGDBGameFilters>(IGDBGameFiltersSchema, req.query)
    const games = await gameService.search(dto)
    res.json(games)
  },

  /**
   * Get a game by its IGDB ID.
   *
   * @route GET /games/:id
   * @param req - Express request object
   * @param res - Express response object
   */
  getByIgdbId: async (req: Request, res: Response): Promise<void> => {
    const igdbId = Number(req.params.id)
    const game = await gameService.getByIgdbId(igdbId)
    assertExists(game, 'Game not found')
    res.json(game)
  },
}
