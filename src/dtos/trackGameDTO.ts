import { TrackGameSchema } from '@schemas/index'
import { z } from 'zod'

/**
 * DTO for tracking a game.
 */
export const TrackGameDTOSchema = TrackGameSchema.transform((data) => data)
export type TrackGameDTO = z.infer<typeof TrackGameDTOSchema>
