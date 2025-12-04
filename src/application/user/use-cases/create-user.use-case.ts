import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common'

import { User, UserProps } from 'src/domain/entities/user.entity'
import { USER_REPOSITORY } from 'src/core/tokens/repository.tokens'
import type { UserRepository } from 'src/domain/repositories/user.repository'

export interface CreateUserUseCaseRequest {
  name: string
  email: string
  registration: string
  status: 'active' | 'inactive'
  phone?: string
  cpf?: string
  role?: 'admin' | 'default' | 'mentor'
}

export interface CreateUserUseCaseResponse {
  user: User
}

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name)

  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepository: UserRepository
  ) {}

  async execute({
    name,
    email,
    registration,
    status,
    phone,
    cpf,
    role
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const existingUser = await this.usersRepository.findByEmail(email)

    if (existingUser) {
      throw new ConflictException('User with this email already exists')
    }

    const user = User.create({
      name,
      email,
      registration,
      status: status as UserProps['status'],
      phone,
      cpf,
      role: role as UserProps['role']
    })

    await this.usersRepository.save(user)

    return { user }
  }
}
