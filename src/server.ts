import { prisma, connectPrisma } from '@clients/index'
import { bootstrap } from '@trackplay/core/server'
import { getEnvConfig } from '@config/index'
import { routes } from '@routes/index'

/**
 * Entry point for the TrackPlay Backend service.
 *
 * This file delegates the bootstrapping process to the shared {@link bootstrap}
 * function from `@trackplay/core/server`, ensuring consistent initialization
 * across all TrackPlay services.
 *
 * Responsibilities:
 * - Loads environment configuration via {@link getEnvConfig}.
 * - Connects to the database with Prisma before starting the server (via {@link connectPrisma}).
 * - Registers service-specific routes defined in {@link routes}.
 * - Passes the service name ("TrackPlay-Backend") for logging and monitoring.
 * - Starts the HTTP/HTTPS server with the provided configuration.
 *
 */
await bootstrap({
  serviceName: 'TrackPlay-Backend',
  routes,
  env: getEnvConfig,
  onBeforeApp: async (logger) => {
    await connectPrisma(prisma, logger)
  },
})
