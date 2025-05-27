import { z } from 'zod'

/**
 * Schema for IGDB game filtering, sorting and pagination options.
 */
export const IGDBGameFiltersSchema = z.object({
  q: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  offset: z.number().min(0).optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  minRating: z.number().min(0).max(100).optional(),
  excludeThemes: z.array(z.number()).optional(),
  platforms: z.array(z.number()).optional(),
  genres: z.array(z.number()).optional(),
})

export type IGDBGameFilters = z.infer<typeof IGDBGameFiltersSchema>
