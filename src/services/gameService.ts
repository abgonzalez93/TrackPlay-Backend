import { gameRepository } from '@repositories/index'
import { CreateGameDTO } from '@dtos/index'
import { Game } from '@prisma/client'

/**
 * Service for business logic related to games.
 */
export const gameService = {
  getAllGames: (): Promise<Game[]> =>
    gameRepository.findAll(),

  getGameById: (id: number): Promise<Game | null> =>
    gameRepository.findById(id),

  getGameByIgdbId: (igdbId: number): Promise<Game | null> =>
    gameRepository.findByIgdbId(igdbId),

  createGame: (data: CreateGameDTO): Promise<Game> =>
    gameRepository.create(data),
}
