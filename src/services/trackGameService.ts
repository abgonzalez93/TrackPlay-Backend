import { trackGameRepository } from '@repositories/index'
import { TrackGameDTO } from '@schemas/index'
import { TrackGame } from '@prisma/client'

/**
 * Service for business logic related to tracking games by users.
 *
 * @module services
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
   * Creates a new tracking record associating a user with a game.
   *
   * @param data - DTO containing tracking data (userId, gameId, status, etc.)
   * @returns A promise that resolves to the created TrackGame entry
   */
  trackGame: (data: TrackGameDTO): Promise<TrackGame> =>
    trackGameRepository.create({
      user: { connect: { id: data.userId } },
      game: { connect: { id: data.gameId } },
      status: data.status,
      rating: data.rating,
      notes: data.notes,
    }),
}
