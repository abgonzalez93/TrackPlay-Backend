import { userRepository } from '@repositories/index'
import { CreateUserDTO } from '@schemas/index'

/**
 * User service to encapsulate business logic.
 *
 * @module services/userServices
 */
export const userServices = {
  getAllUsers: () => userRepository.findAll(),
  getUserById: (id: number) => userRepository.findById(id),
  createUser: (data: CreateUserDTO) => userRepository.create(data),
}
