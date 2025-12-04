import { Injectable, Inject } from '@nestjs/common'

import { EntityMetadata } from 'src/core/entities/entity'
import { User, UserProps, UserRole, UserStatus } from 'src/domain/entities/user.entity'

import { USER_REPOSITORY } from 'src/core/tokens/repository.tokens'
import type { UserRepository } from 'src/domain/repositories/user.repository'

type MakeUserProps = Partial<UserProps & EntityMetadata>

export function makeUser(override: MakeUserProps = {}) {
  return User.create({
    name: 'Test User',
    registration: '1',
    email: 'test@example.com',
    password: '123456',
    role: UserRole.Default,
    status: UserStatus.Active,
    departament: 'IT',
    phone: null,
    cpf: null,
    ...override,
  })
}

@Injectable()
export class UserFactory {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async makeTypeormUser(data: MakeUserProps = {}): Promise<User> {
    const user = makeUser(data)
    await this.userRepository.create(user)
    return user
  }
}
