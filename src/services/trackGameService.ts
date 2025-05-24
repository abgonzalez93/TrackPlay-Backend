import { trackGameRepository } from '@repositories/index'
import { TrackGameDTO } from '@dtos/index'
import { TrackGame } from '@prisma/client'

/**
 * Service for business logic related to tracking games by users.
 */
export const trackGameService = {
  getAll: (): Promise<TrackGame[]> =>
    trackGameRepository.findAll(),

  getByUserAndGame: (userId: number, gameId: number): Promise<TrackGame | null> =>
    trackGameRepository.findByUserAndGame(userId, gameId),

  trackGame: (data: TrackGameDTO): Promise<TrackGame> =>
    trackGameRepository.create({
      user: { connect: { id: data.userId } },
      game: { connect: { id: data.gameId } },
      status: data.status,
      rating: data.rating,
      notes: data.notes,
    }),
}
