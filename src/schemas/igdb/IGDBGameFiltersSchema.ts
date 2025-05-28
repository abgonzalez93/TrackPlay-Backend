import { IGDB } from '@constants/index'
import { z } from 'zod'

/**
 * Schema for IGDB game filtering, sorting and pagination options.
 * Accepts query params as strings and converts them to numbers automatically.
 */
export const IGDBGameFiltersSchema = z.object({
  q: z.string().optional(),
  limit: z.coerce.number().min(1).max(IGDB.MAX_GAME_LIMIT).optional(),
  offset: z.coerce.number().min(0).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  minRating: z.coerce.number().min(0).max(IGDB.MAX_GAME_LIMIT).optional(),
  excludeThemes: z.coerce.number().array().optional(),
  platforms: z.coerce.number().array().optional(),
  genres: z.coerce.number().array().optional(),
})

export type IGDBGameFilters = z.infer<typeof IGDBGameFiltersSchema>
