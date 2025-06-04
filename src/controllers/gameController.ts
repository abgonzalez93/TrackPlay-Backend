import { IGDBGameFiltersSchema, IGDBGameFilters, IGDBGame } from '@trackplay/core/schemas'
import { assertValid, assertExists } from '@trackplay/core/utils'
import { gameService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling routes related to games.
 *
 * @module controllers
 */
export const gameController = {
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
    assertExists<IGDBGame>(game, 'Game not found')
    res.json(game)
  },
}
