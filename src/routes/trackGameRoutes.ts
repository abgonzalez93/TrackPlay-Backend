import { trackGameController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for user-game tracking endpoints.
 *
 * @module routes/trackGameRoutes
 */
export const trackGameRoutes = Router()

trackGameRoutes.get('/', trackGameController.getAll)
trackGameRoutes.post('/', trackGameController.track)
