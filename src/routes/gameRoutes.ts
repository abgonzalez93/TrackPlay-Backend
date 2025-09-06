import { gameController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for game endpoints.
 */
export const gameRoutes = Router()

gameRoutes.get('/meta', gameController.index)
gameRoutes.get('/', gameController.list)
gameRoutes.get('/search', gameController.search)
gameRoutes.get('/:id', gameController.getByIgdbId)
