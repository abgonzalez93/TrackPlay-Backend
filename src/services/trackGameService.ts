import { trackGameRepository } from '@repositories/index'
import { ConflictError } from '@trackplay/core/errors'
import { TrackGameDTO } from '@trackplay/core/schemas'
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
  getAll: (): Promise<TrackGame[]> => trackGameRepository.findAll(),

  /**
   * Retrieves a tracking record by user ID and game ID.
   *
   * @param userId - ID of the user
   * @param gameId - ID of the game
   * @returns A promise that resolves to a TrackGame entry or null if not found
   */
  getByUserAndGame: (userId: number, gameId: number): Promise<TrackGame | null> =>
    trackGameRepository.findByUserAndGame(userId, gameId),

  /**
   * Creates a new tracking record for a user-game relation,
   * ensuring no duplication exists.
   *
   * @param data - DTO containing tracking information
   * @returns The newly created TrackGame record
   */
  trackGame: async (data: TrackGameDTO): Promise<TrackGame> => {
    const existing = await trackGameRepository.findByUserAndGame(data.userId, data.gameId)
    if (existing) throw new ConflictError('Email already in use')

    return trackGameRepository.create({
      user: { connect: { id: data.userId } },
      game: { connect: { id: data.gameId } },
      status: data.status,
      rating: data.rating,
      notes: data.notes,
    })
  },
}
