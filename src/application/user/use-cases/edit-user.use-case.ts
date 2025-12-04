import { ConflictException, Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';

import { USER_REPOSITORY } from 'src/core/tokens/repository.tokens';
import type { UserRepository } from 'src/domain/repositories/user.repository';
import { User, UserRole, UserStatus } from 'src/domain/entities/user.entity';

export interface EditUserUseCaseRequest {
  id: string;
  name?: string;
  email?: string;
  registration?: string;
  password?: string;
  departament?: string;
  phone?: string | null;
  cpf?: string | null;
  role?: UserRole;
  status?: UserStatus;
}

export interface EditUserUseCaseResponse {
  user: User;
}

@Injectable()
export class EditUserUseCase {
  private readonly logger = new Logger(EditUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UserRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    registration,
    password,
    departament,
    phone,
    cpf,
    role,
    status,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (email && email !== user.email) {
      const existingWithEmail = await this.usersRepository.findByEmail(email);
      if (existingWithEmail && existingWithEmail.id.toString() !== user.id.toString()) {
        throw new ConflictException('User with this email already exists');
      }
    }

    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (registration !== undefined) user.registration = registration;
    if (password !== undefined) user.password = password;
    if (departament !== undefined) user.departament = departament;
    if (phone !== undefined) user.phone = phone;
    if (cpf !== undefined) user.cpf = cpf;
    if (role !== undefined) user.role = role;
    if (status !== undefined) user.status = status;

    await this.usersRepository.save(user);

    return { user };
  }
}
