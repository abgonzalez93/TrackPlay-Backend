import { TrackGameDTO, TrackGameDTOSchema } from '@dtos/index'
import { checkConflict, validateInput } from '@helpers/index'
import { Request, Response, NextFunction } from 'express'
import { trackGameService } from '@services/index'
import { httpStatus } from '@constants/index'

/**
 * Controller for handling routes related to user game tracking.
 *
 * @module controllers/trackGameController
 */
export const trackGameController = {
  /**
   * Retrieves all user-game tracking entries from the database.
   *
   * @param _req - Express request object (unused)
   * @param res - Express response object
   * @returns Responds with a list of tracked games
   */
  getAll: async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    const tracked = await trackGameService.getAll()
    res.json(tracked)
  },

  /**
   * Tracks a game for a specific user if not already tracked.
   *
   * @param req - Express request object containing tracking data in the body
   * @param res - Express response object
   * @param next - Express next middleware function for error handling
   * @returns Responds with the created trackGame entry or an error
   */
  track: async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const dto = validateInput<TrackGameDTO>(TrackGameDTOSchema, req, next)
    if (!dto) return

    const exists = await trackGameService.getByUserAndGame(
      dto.userId,
      dto.gameId,
    )
    if (checkConflict(exists, 'You are already tracking this game', next))
      return

    const tracked = await trackGameService.trackGame(dto)
    res.status(httpStatus.CREATED).json(tracked)
  },
}
