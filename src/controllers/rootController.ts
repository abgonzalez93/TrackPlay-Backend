import { HTTP_STATUS } from '@trackplay/core/constants'
import { Request, Response } from 'express'

/**
 * Controller for handling the root route of the TrackPlay API.
 *
 * Provides general metadata and a list of available API endpoints.
 */
export const rootController = {
  /**
   * Returns metadata about the root of the API, listing all top-level resources.
   *
   * @param _req - Express request object
   * @param res - Express response object
   */
  index: (_req: Request, res: Response): void => {
    res.status(HTTP_STATUS.OK).json({
      name: 'TrackPlay API',
      version: '1.0.0',
      description: 'Root entrypoint for the TrackPlay API',
      metaHint: "For detailed information about each module's endpoints, visit the corresponding /<module>/meta path.",
      modules: [
        {
          resource: 'auth',
          path: '/auth',
          description: 'Authentication and token management',
        },
        {
          resource: 'users',
          path: '/users',
          description: 'User registration and retrieval',
        },
        {
          resource: 'games',
          path: '/games',
          description: 'Game search and lookup via IGDB',
        },
        {
          resource: 'track-games',
          path: '/track-games',
          description: 'User game tracking and history',
        },
      ],
    })
  },
}
