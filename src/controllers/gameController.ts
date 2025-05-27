import { IGDBGameFiltersSchema, IGDBGameFilters } from '@schemas/index'
import { assertValid, assertExists } from '@utils/index'
import { buildIGDBQuery } from '@utils/index'
import { gameService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling routes related to games.
 *
 * @module controllers/gameController
 */
export const gameController = {
  /**
   * Search games by query string.
   *
   * @route GET /games/search
   * @param req - Express request object
   * @param res - Express response object
   */
  async search(req: Request, res: Response): Promise<void> {
    const dto = assertValid<IGDBGameFilters>(IGDBGameFiltersSchema, req.body)
    const query = buildIGDBQuery(dto)
    const games = await gameService.search(query)
    res.json(games)
  },

  /**
   * Get a game by its IGDB ID.
   *
   * @route GET /games/:id
   * @param req - Express request object
   * @param res - Express response object
   */
  async getByIgdbId(req: Request, res: Response): Promise<void> {
    const igdbId = Number(req.params.id)
    const game = await gameService.getByIgdbId(igdbId)
    assertExists(game, 'Game not found')
    res.json(game)
  },
}
