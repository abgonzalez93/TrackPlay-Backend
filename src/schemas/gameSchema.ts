import { z } from 'zod'

/**
 * Zod schema for creating a game entry.
 */
export const CreateGameSchema = z.object({
  igdbId: z.number().int(),
  name: z.string().min(1),
  summary: z.string().optional(),
  coverUrl: z.string().url().optional(),
  releaseDate: z.coerce.date().optional(),
  genres: z.array(z.string()),
  platforms: z.array(z.string()),
})
