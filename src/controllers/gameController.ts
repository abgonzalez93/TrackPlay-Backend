import { checkBadRequest, checkNotFound } from '@helpers/index'
import { Request, Response, NextFunction } from 'express'
import { gameService } from '@services/index'

/**
 * Controller for handling routes related to games.
 *
 * @module controllers/gameController
 */
export const gameController = {
  /**
   * Search games by query string.
   *
   * @route GET /games/search?q=...
   */
  search: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const query = req.query.q as string
    if (checkBadRequest(!query, 'Missing search query', next)) return

    const games = await gameService.search(query)
    res.json(games)
  },

  /**
   * Get a game by its IGDB ID.
   *
   * @route GET /games/:id
   */
  getByIgdbId: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const igdbId = Number(req.params.id)
    const game = await gameService.getByIgdbId(igdbId)

    if (checkNotFound(game, 'Game not found', next)) return

    res.json(game)
  },
}
