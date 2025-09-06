import { Prisma, TrackGame } from '@prisma/client'
import { prisma } from '@clients/index'

/**
 * Repository for TrackGame operations.
 *
 * Handles database interactions for tracking relations between users and games.
 */
export const trackGameRepository = {
  /**
   * Retrieves all track records between users and games.
   *
   * @returns A promise resolving to an array of TrackGame entries
   */
  findAll: async (): Promise<TrackGame[]> => await prisma.trackGame.findMany(),

  /**
   * Finds a specific track record by user ID and game ID.
   *
   * @param userId - The ID of the user
   * @param gameId - The ID of the game
   * @returns A promise resolving to the TrackGame entry or null if not found
   */
  findByUserAndGame: async (userId: number, gameId: number): Promise<TrackGame | null> =>
    await prisma.trackGame.findUnique({
      where: { userId_gameId: { userId, gameId } },
    }),

  /**
   * Creates a new track record for a user and a game.
   *
   * @param data - TrackGame creation input following Prisma schema
   * @returns A promise resolving to the newly created TrackGame entry
   */
  create: async (data: Prisma.TrackGameCreateInput): Promise<TrackGame> => await prisma.trackGame.create({ data }),
}
