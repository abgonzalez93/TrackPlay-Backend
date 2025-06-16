import { rootController } from '@controllers/index'
import { Router } from 'express'

/**
 * Express router for the root endpoint of the IGDB microservice.
 */
export const rootRoutes = Router()

rootRoutes.get('/', rootController.index)
