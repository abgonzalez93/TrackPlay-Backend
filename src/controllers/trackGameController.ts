import { TrackGameSchema } from '@trackplay/core/schemas'
import { HTTP_STATUS } from '@trackplay/core/constants'
import { validateSchema } from '@trackplay/core/utils'
import { trackGameService } from '@services/index'
import { Request, Response } from 'express'

/**
 * Controller for handling routes related to user game tracking.
 */
export const trackGameController = {
  /**
   * Returns metadata about available user game tracking routes.
   *
   * @param _req - Express request object
   * @param res - Express response object
   */
  index: (_req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
      resource: 'track-games',
      description: 'Endpoints for tracking games by users',
      endpoints: [
        {
          method: 'GET',
          path: '/track-games',
          description: 'Retrieve all user-game tracking entries',
        },
        {
          method: 'POST',
          path: '/track-games',
          description: 'Track a game for a specific user',
        },
      ],
    })
  },

  /**
   * Retrieves all user-game tracking entries from the database.
   *
   * @param _req - Express request object (unused)
   * @param res - Express response object
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
   */
  track: async (req: Request, res: Response): Promise<void> => {
    const tracking = validateSchema(TrackGameSchema, req.body)
    const tracked = await trackGameService.trackGame(tracking)
    res.status(HTTP_STATUS.CREATED).json(tracked)
  },
}
