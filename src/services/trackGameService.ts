import { TrackGame as TrackGameDTO } from '@trackplay/core/schemas'
import { trackGameRepository } from '@repositories/index'
import { ConflictError } from '@trackplay/core/errors'
import { TrackGame } from '@prisma/client'

/**
 * Service for business logic related to tracking games by users.
 */
export const trackGameService = {
  /**
   * Retrieves all track records from the database.
   *
   * @returns A promise that resolves to an array of TrackGame entries
   */
  getAll: async (): Promise<TrackGame[]> => await trackGameRepository.findAll(),

  /**
   * Retrieves a tracking record by user ID and game ID.
   *
   * @param userId - ID of the user
   * @param gameId - ID of the game
   * @returns A promise that resolves to a TrackGame entry or null if not found
   */
  getByUserAndGame: async (userId: number, gameId: number): Promise<TrackGame | null> =>
    await trackGameRepository.findByUserAndGame(userId, gameId),

  /**
   * Creates a new tracking record for a user-game relation,
   * ensuring no duplication exists.
   *
   * @param tracking - Contains tracking information
   * @returns The newly created TrackGame record
   */
  trackGame: async (tracking: TrackGameDTO): Promise<TrackGame> => {
    const { status, userId, gameId, rating, notes } = tracking
    const existing = await trackGameRepository.findByUserAndGame(userId, gameId)
    if (existing) throw new ConflictError('This game is already being tracked by the user')

    return trackGameRepository.create({
      user: { connect: { id: userId } },
      game: { connect: { id: gameId } },
      status: status,
      rating: rating,
      notes: notes,
    })
  },
}
