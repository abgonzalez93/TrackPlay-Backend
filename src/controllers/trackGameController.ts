import { TrackGameDTO, TrackGameDTOSchema } from '@trackplay/core/schemas'
import { assertValid, assertNotExists } from '@trackplay/core/utils'
import { HTTP_STATUS } from '@trackplay/core/constants'
import { trackGameService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling routes related to user game tracking.
 *
 * @module controllers
 */
export const trackGameController = {
  /**
   * Retrieves all user-game tracking entries from the database.
   *
   * @param _req - Express request object (unused)
   * @param res - Express response object
   * @returns Responds with a list of tracked games
   */
  getAll: async (_req: Request, res: Response): Promise<void> => {
    const tracked = await trackGameService.getAll()
    res.json(tracked)
  },

  /**
   * Tracks a game for a specific user if not already tracked.
   *
   * @param req - Express request object containing tracking data in the body
   * @param res - Express response object
   * @returns Responds with the created trackGame entry
   * @throws ApiError if input is invalid or game is already tracked
   */
  track: async (req: Request, res: Response): Promise<void> => {
    const dto = assertValid<TrackGameDTO>(TrackGameDTOSchema, req.body)

    const exists = await trackGameService.getByUserAndGame(dto.userId, dto.gameId)

    assertNotExists(exists, 'You are already tracking this game')

    const tracked = await trackGameService.trackGame(dto)
    res.status(HTTP_STATUS.CREATED).json(tracked)
  },
}
