import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';

import { User, UserProps, UserRole, UserStatus } from 'src/domain/entities/user.entity';
import { USER_REPOSITORY } from 'src/core/tokens/repository.tokens';
import type { UserRepository } from 'src/domain/repositories/user.repository';

export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  registration: string;
  password: string;
  departament: string;
  status?: UserStatus;              
  phone?: string;
  cpf?: string;
  role?: UserRole;            
}

export interface CreateUserUseCaseResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  private readonly logger = new Logger(CreateUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepository: UserRepository,
  ) {}

  async execute({
    name,
    email,
    registration,
    password,
    departament,
    status,
    phone,
    cpf,
    role,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    // const existingUser = await this.usersRepository.findByEmail(email);

    // if (existingUser) {
    //   throw new ConflictException('User with this email already exists');
    // }

    const user = User.create({
      name,
      email,
      registration,
      password,
      departament,
      phone,
      cpf,
      status: status ?? undefined,
      role: role ?? undefined,
    } as UserProps);

    await this.usersRepository.save(user);

    return { user };
  }
}
