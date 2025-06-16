import { TrackGameDTO, TrackGameDTOSchema } from '@trackplay/core/schemas'
import { HTTP_STATUS } from '@trackplay/core/constants'
import { parseOrThrow } from '@trackplay/core/utils'
import { trackGameService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling routes related to user game tracking.
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
    res.status(HTTP_STATUS.OK).json(tracked)
  },

  /**
   * Tracks a game for a specific user if not already tracked.
   *
   * @param req - Express request object containing tracking data in the body
   * @param res - Express response object
   * @returns Responds with the created trackGame entry
   * @throws TrackPlayError if input is invalid or game is already tracked
   */
  track: async (req: Request, res: Response): Promise<void> => {
    const dto = parseOrThrow<TrackGameDTO>(TrackGameDTOSchema, req.body)
    const tracked = await trackGameService.trackGame(dto)
    res.status(HTTP_STATUS.CREATED).json(tracked)
  },
}
