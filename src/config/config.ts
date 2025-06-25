import {
  NodeEnvSchema,
  IpAddressSchema,
  PortSchema,
  NonEmptyStringSchema,
  UrlStringSchema,
  PositiveNumberSchema,
} from '@trackplay/core/schemas'
import { createEnv } from '@t3-oss/env-core'

export const getEnvConfig = createEnv({
  server: {
    NODE_ENV: NodeEnvSchema,

    HOST: IpAddressSchema,
    PORT: PortSchema,
    CORS_ORIGINS: NonEmptyStringSchema,

    DATABASE_URL: UrlStringSchema,
    AUTH_API_URL: UrlStringSchema,
    IGDB_API_URL: UrlStringSchema,

    AUTH_SECRET_KEY: NonEmptyStringSchema,

    SALT_ROUNDS: PositiveNumberSchema,
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
