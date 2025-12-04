import { Injectable } from '@nestjs/common'

import { EntityMetadata } from 'src/core/entities/entity'
import { User, UserProps, UserRole, UserStatus } from 'src/domain/entities/user.entity'

import { TypeormUserRepository } from 'src/infraestructure/database/typeorm/repositories/typeorm-user.repository'

type MakeUserProps = Partial<UserProps & EntityMetadata>

export function makeUser(override: MakeUserProps = {}) {
  return User.create({
    name: 'Test User',
    email: 'test@example.com',
    registration: '10',
    password: 'test-password',   // ← OBRIGATÓRIO EM USER PROPS
    departament: 'TI',
    role: UserRole.Default,
    status: UserStatus.Active,
    phone: null,
    cpf: null,
    ...override,                 // ← sobrescrições opcionais
  } satisfies UserProps & Partial<EntityMetadata>)
}

@Injectable()
export class UserFactory {
  constructor(private readonly userRepository: TypeormUserRepository) {}

  async makeTypeormUser(data: MakeUserProps = {}): Promise<User> {
    const user = makeUser(data)

    await this.userRepository.create(user)

    return user
  }
}
