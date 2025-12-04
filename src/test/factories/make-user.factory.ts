import { Injectable } from '@nestjs/common'

import { EntityMetadata } from 'src/core/entities/entity'
import { User, UserProps, UserRole } from 'src/domain/entities/user.entity'
import { UserStatus } from 'src/domain/entities/user-base.entity'

import { TypeormUserRepository } from 'src/infraestructure/database/typeorm/repositories/typeorm-user.repository'

type MakeUserProps = Partial<UserProps & EntityMetadata>

// A factory de domínio permanece a mesma
export function makeUser(override: MakeUserProps = {}) {
  return User.create({
    name: 'Test User',
    email: 'test@example.com',
    role: UserRole.Default,
    status: UserStatus.Active,
    phone: undefined,
    cpf: undefined,
    profileImageId: null,
    ...override, // agora, se quiser sobrescrever algo no teste, funciona
  })
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
