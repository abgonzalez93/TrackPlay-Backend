import { CreateGameDTO, CreateGameDTOSchema } from '@dtos/index'
import { checkConflict, validateInput } from '@helpers/index'
import { Request, Response, NextFunction } from 'express'
import { gameService } from '@services/index'
import { httpStatus } from '@constants/index'
import { ApiError } from '@errors/index'

/**
 * Controller for handling routes related to games.
 */
export const gameController = {
  getAll: async (_req: Request, res: Response): Promise<void> => {
    const games = await gameService.getAllGames()
    res.json(games)
  },

  getById: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const id = Number(req.params.id)
    const game = await gameService.getGameById(id)

    if (!game) {
      return next(
        new ApiError('Game not found', httpStatus.NOT_FOUND)
      )
    }

    res.json(game)
  },

  create: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dto = validateInput<CreateGameDTO>(CreateGameDTOSchema, req, next)
    if (!dto) return

    const exists = await gameService.getGameByIgdbId(dto.igdbId)
    if (checkConflict(exists, 'Game with this IGDB ID already exists', next)) return

    const game = await gameService.createGame(dto)
    res.status(httpStatus.CREATED).json(game)
  },
}
