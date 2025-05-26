import { CreateGameSchema } from '@schemas/index'
import { z } from 'zod'

/**
 * DTO for creating a Game entity from IGDB data.
 */
export const CreateGameDTOSchema = CreateGameSchema.transform((data) => data)
export type CreateGameDTO = z.infer<typeof CreateGameDTOSchema>
