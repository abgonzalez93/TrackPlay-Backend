import { Request, Response } from 'express'

/**
 * Controller for handling the root route of the TrackPlay API.
 *
 * Provides general metadata and a list of available API endpoints.
 *
 * @module controllers
 */
export const rootController = {
  /**
   * GET /
   *
   * Returns general service information and available API routes.
   *
   * @param req - Express request object
   * @param res - Express response object
   * @returns JSON object containing API metadata
   */
  index: (_req: Request, res: Response): void => {
    res.json({
      name: 'TrackPlay API',
      version: '1.0.0',
      description: 'Backend service for TrackPlay platform',
      endpoints: [
        { method: 'GET', path: '/games/search', description: 'Search games with filters' },
        { method: 'GET', path: '/games/:id', description: 'Get game details by ID' },
      ],
    })
  },
}
