import { IGDBGameFilters, IGDBGameFiltersSchema, IGDBId, IGDBIdSchema } from '@trackplay/core/schemas'
import { HTTP_STATUS } from '@trackplay/core/constants'
import { parseOrThrow } from '@trackplay/core/utils'
import { gameService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling routes related to games.
 */
export const gameController = {
  /**
   * Returns metadata about available game-related routes.
   *
   * @param _req - Express request object
   * @param res - Express response object
   */
  index: (_req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
      resource: 'games',
      description: 'Public game search and retrieval endpoints',
      endpoints: [
        {
          method: 'POST',
          path: '/games/search',
          description: 'Search games using IGDB filters',
        },
        {
          method: 'GET',
          path: '/games/:id',
          description: 'Get game details by IGDB ID',
        },
      ],
    })
  },

  /**
   * Search games by query string.
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  search: async (req: Request, res: Response): Promise<void> => {
    const filters = parseOrThrow<IGDBGameFilters>(IGDBGameFiltersSchema, req.query)
    const games = await gameService.search(filters)
    res.status(HTTP_STATUS.OK).json(games)
  },

  /**
   * Get a game by its IGDB ID.
   *
   * @param req - Express request object
   * @param res - Express response object
   */
  getByIgdbId: async (req: Request, res: Response): Promise<void> => {
    const id = parseOrThrow<IGDBId>(IGDBIdSchema, req.params.id)
    const game = await gameService.getByIgdbId(id)
    res.status(HTTP_STATUS.OK).json(game)
  },
}
