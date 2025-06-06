import { gameController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for game endpoints.
 *
 * @module routes
 */
export const gameRoutes = Router()

gameRoutes.get('/', gameController.index)
gameRoutes.get('/search', gameController.search)
gameRoutes.get('/:id', gameController.getByIgdbId)
