import { gameController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for game endpoints.
 *
 * @module routes/gameRoutes
 */
export const gameRoutes = Router()

gameRoutes.get('/search', gameController.search)
gameRoutes.get('/:id', gameController.getByIgdbId)
