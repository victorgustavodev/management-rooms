import { Repository } from 'src/core/repositories/repository'

import { User } from '../entities/user.entity'

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>
}
