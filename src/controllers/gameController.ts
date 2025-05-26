import { buildIGDBQuery, checkBadRequest, checkNotFound } from '@utils/index'
import { Request, Response, NextFunction } from 'express'
import { IGDBGameFiltersSchema } from '@schemas/index'
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
    const parsed = IGDBGameFiltersSchema.safeParse(req.query)

    if (!parsed.success) {
      checkBadRequest(true, 'Invalid query parameters', next)
      return
    }

    const filters = parsed.data
    const query = buildIGDBQuery(filters)

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
