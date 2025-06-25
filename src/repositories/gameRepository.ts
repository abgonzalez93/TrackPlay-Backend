import { Prisma, Game } from '@prisma/client'
import { prisma } from '@services/index'

/**
 * Repository for Game database operations.
 *
 * Provides direct access to the Game table using Prisma client.
 */
export const gameRepository = {
  /**
   * Retrieves all games from the database.
   *
   * @returns A promise resolving to an array of Game entities
   */
  findAll: async (): Promise<Game[]> => await prisma.game.findMany(),

  /**
   * Finds a game by its internal database ID.
   *
   * @param id - The internal ID of the game
   * @returns A promise resolving to the Game entity or null if not found
   */
  findById: async (id: number): Promise<Game | null> => await prisma.game.findUnique({ where: { id } }),

  /**
   * Finds a game by its IGDB ID.
   *
   * @param igdbId - The IGDB ID of the game
   * @returns A promise resolving to the Game entity or null if not found
   */
  findByIgdbId: async (igdbId: number): Promise<Game | null> => await prisma.game.findUnique({ where: { igdbId } }),

  /**
   * Creates a new game entry in the database.
   *
   * @param data - Game creation input data following Prisma schema
   * @returns A promise resolving to the newly created Game entity
   */
  create: async (data: Prisma.GameCreateInput): Promise<Game> => await prisma.game.create({ data }),
}
