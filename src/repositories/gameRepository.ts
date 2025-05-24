import { Prisma, Game } from '@prisma/client'
import { prisma } from '@config/index'

/**
 * Repository for Game database operations.
 */
export const gameRepository = {
  findAll: (): Promise<Game[]> =>
    prisma.game.findMany(),

  findById: (id: number): Promise<Game | null> =>
    prisma.game.findUnique({ where: { id } }),

  findByIgdbId: (igdbId: number): Promise<Game | null> =>
    prisma.game.findUnique({ where: { igdbId } }),

  create: (data: Prisma.GameCreateInput): Promise<Game> =>
    prisma.game.create({ data }),
}
