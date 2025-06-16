import { IGDBGameFiltersSchema, IGDBGameFilters, IGDBIdSchema, IGDBId } from '@trackplay/core/schemas'
import { HTTP_STATUS } from '@trackplay/core/constants'
import { NotFoundError } from '@trackplay/core/errors'
import { parseOrThrow } from '@trackplay/core/utils'
import { gameService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling routes related to games.
 */
export const gameController = {
  /**
   * Returns basic metadata and available game-related endpoints.
   *
   * @route GET /games
   * @param req - Express request object
   * @param res - Express response object
   * @returns JSON object with information about available endpoints
   */
  index: (_req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
      resource: 'games',
      description: 'Endpoints related to IGDB games',
      endpoints: [
        {
          method: 'GET',
          path: '/games/search',
          description: 'Search games using filters',
        },
        {
          method: 'GET',
          path: '/games/:id',
          description: 'Retrieve a game by its IGDB ID',
        },
      ],
    })
  },
  /**
   * Search games by query string.
   *
   * @route POST /games/search
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
   * @route GET /games/:id
   * @param req - Express request object
   * @param res - Express response object
   */
  getByIgdbId: async (req: Request, res: Response): Promise<void> => {
    const igdbId = parseOrThrow<IGDBId>(IGDBIdSchema, req.params.id)
    const game = await gameService.getByIgdbId(igdbId)
    if (!game) throw new NotFoundError('Game not found')
    res.status(HTTP_STATUS.OK).json(game)
  },
}
