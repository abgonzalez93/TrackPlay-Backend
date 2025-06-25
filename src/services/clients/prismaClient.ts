import { getLogger } from '@trackplay/core/logger'
import { PrismaClient } from '@prisma/client'

/**
 * Singleton instance of Prisma Client for database access.
 *
 * This client handles all interactions with the PostgreSQL database
 * via Prisma ORM.
 *
 * @see startPrisma - Optional method to validate DB connection during bootstrap.
 */
export const prisma = new PrismaClient()

/**
 * Optionally establishes a connection to the database during application startup.
 *
 * This is useful in environments where you want to validate database connectivity early
 * and fail fast if something is misconfigured.
 *
 * @throws If unable to connect to the database
 */
export const startPrisma = async (): Promise<void> => {
  const log = getLogger()

  try {
    await prisma.$connect()
    log.info('✅ Prisma connected')
  } catch (error) {
    log.error('❌ Failed to connect to Prisma database:', error)
    process.exit(1)
  }
}
