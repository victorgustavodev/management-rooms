import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { UserRepository } from 'src/domain/repositories/user.repository'

import { User } from 'src/domain/entities/user.entity'

export class InMemoryUserRepository
  extends InMemoryEntityRepository<User>
  implements UserRepository
{
  findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)
    return Promise.resolve(user || null)
  }
}
