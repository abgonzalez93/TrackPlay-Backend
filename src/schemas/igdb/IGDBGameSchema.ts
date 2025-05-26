import { z } from 'zod'

/**
 * Zod schema to validate a game from IGDB API.
 */
export const IGDBGameSchema = z.object({
  id: z.number(),
  name: z.string(),
  slug: z.string(),
  summary: z.string().optional(),
  storyline: z.string().optional(),
  first_release_date: z.number().optional(),
  rating: z.number().optional(),
  total_rating: z.number().optional(),
  url: z.string().optional(),
  cover: z
    .object({
      url: z.string(),
    })
    .optional(),
  genres: z.array(z.object({ name: z.string() })).optional(),
  platforms: z.array(z.object({ name: z.string() })).optional(),
  screenshots: z.array(z.object({ url: z.string() })).optional(),
  videos: z.array(z.object({ video_id: z.string() })).optional(),
})

export type IGDBGame = z.infer<typeof IGDBGameSchema>
