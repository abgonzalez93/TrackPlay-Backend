import { z } from 'zod'

/**
 * Zod schema for tracking a game by a user.
 */
export const TrackGameSchema = z.object({
  userId: z.number().int(),
  gameId: z.number().int(),
  status: z.enum(['wishlist', 'playing', 'completed', 'dropped']),
  rating: z.number().int().min(1).max(10).optional(),
  notes: z.string().max(1000).optional(),
})
