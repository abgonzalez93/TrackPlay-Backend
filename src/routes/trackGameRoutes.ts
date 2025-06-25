import { trackGameController } from '@controllers/index'
import { requireAccessToken } from '@middlewares/index'
import { Router } from 'express'

/**
 * Express router for user-game tracking endpoints.
 */
export const trackGameRoutes = Router()

trackGameRoutes.get('/meta', trackGameController.index)
trackGameRoutes.get('/', trackGameController.getAll)
trackGameRoutes.post('/', requireAccessToken, trackGameController.track)
