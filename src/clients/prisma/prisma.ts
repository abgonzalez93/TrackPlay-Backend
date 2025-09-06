import { PrismaClient } from '@prisma/client'
import { getEnvConfig } from '@config/index'
import { Logger } from 'winston'

const { DATABASE_URL } = getEnvConfig

/**
 * Creates a new PrismaClient.
 * @param url - The database connection string.
 * @returns PrismaClient
 */
export const createPrisma = (url: string): PrismaClient => {
  return new PrismaClient({
    datasources: {
      db: {
        url,
      },
    },
  })
}

/**
 * Prisma client instance used to interact with the database.
 *
 * This client is created using a custom function `createPrisma`,
 * which allows passing the database URL dynamically (e.g., from environment variables).
 *
 * @see createPrisma - Custom function to create a PrismaClient instance with the provided URL.
 */
export const prisma = createPrisma(DATABASE_URL)

/**
 * Connects the provided Prisma client to the database.
 * @param client - Prisma client instance
 */
export const connectPrisma = async (client: PrismaClient, logger: Logger): Promise<void> => {
  try {
    await client.$connect()
    logger.info('✅ Prisma connected')
  } catch (error) {
    logger.error('❌ Failed to connect to Prisma:', error)
    process.exit(1)
  }
}

/**
 * Optionally disconnects the Prisma client
 * @param client - Prisma client instance
 */
export const disconnectPrisma = async (client: PrismaClient, logger: Logger): Promise<void> => {
  try {
    await client.$disconnect()
    logger.info('🛑 Prisma disconnected')
  } catch (error) {
    logger.error('❌ Failed to disconnect Prisma:', error)
  }
}
