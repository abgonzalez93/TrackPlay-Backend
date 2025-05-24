import { Prisma, User } from '@prisma/client'
import { prisma } from '@config/index'

/**
 * User repository for database operations.
 */
export const userRepository = {
  findAll: (): Promise<User[]> =>
    prisma.user.findMany(),

  findById: (id: number): Promise<User | null> =>
    prisma.user.findUnique({ where: { id } }),

  findByEmail: (email: string): Promise<User | null> =>
    prisma.user.findUnique({ where: { email } }),

  findByUsername: (username: string): Promise<User | null> =>
    prisma.user.findUnique({ where: { username } }),

  create: (data: Prisma.UserCreateInput): Promise<User> =>
    prisma.user.create({ data }),
}
