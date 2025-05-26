import { z } from 'zod'

/**
 * Schema for IGDB game filtering, sorting and pagination options.
 */
export const IGDBGameFiltersSchema = z.object({
  q: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  offset: z.coerce.number().int().min(0).optional().default(0),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  minRating: z.coerce.number().min(0).max(100).optional(),
  excludeThemes: z.array(z.coerce.number()).optional(),
  platforms: z.array(z.coerce.number()).optional(),
  genres: z.array(z.coerce.number()).optional(),
})

export type IGDBGameFilters = z.infer<typeof IGDBGameFiltersSchema>
