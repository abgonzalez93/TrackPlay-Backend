import { prisma } from '@config/index'

/**
 * User repository for DB operations.
 *
 * @module repositories/userRepository
 */
export const userRepository = {
  findAll: () => prisma.user.findMany(),
  findById: (id: number) => prisma.user.findUnique({ where: { id } }),
  create: (data: { email: string, name?: string }) => prisma.user.create({ data }),
}
