import { Prisma, TrackGame } from '@prisma/client'
import { prisma } from '@config/index'

/**
 * Repository for TrackGame operations.
 * Handles relations between users and games.
 */
export const trackGameRepository = {
  findAll: (): Promise<TrackGame[]> =>
    prisma.trackGame.findMany(),

  findByUserAndGame: (userId: number, gameId: number): Promise<TrackGame | null> =>
    prisma.trackGame.findUnique({ where: { userId_gameId: { userId, gameId } }}),

  create: (data: Prisma.TrackGameCreateInput): Promise<TrackGame> =>
    prisma.trackGame.create({ data }),
}
