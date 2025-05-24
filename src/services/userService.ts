import { userRepository } from '@repositories/userRepository'
import { CreateUserDTO } from '@dtos/index'
import { User } from '@prisma/client'

/**
 * Business logic for User operations.
 */
export const userService = {
  getAllUsers: (): Promise<User[]> =>
    userRepository.findAll(),

  getUserById: (id: number): Promise<User | null> =>
    userRepository.findById(id),

  getUserByEmail: (email: string) =>
    userRepository.findByEmail(email),

  getUserByUsername: (username: string) =>
    userRepository.findByUsername(username),

  createUser: (data: CreateUserDTO): Promise<User> =>
    userRepository.create(data),
}
