import { Inject, Injectable, Logger } from '@nestjs/common';

import { USER_REPOSITORY } from 'src/core/tokens/repository.tokens';
import type { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

export interface FetchUsersUseCaseRequest {
  limit?: number;
  offset?: number;
}

export interface FetchUsersUseCaseResponse {
  users: User[];
}

@Injectable()
export class FetchUsersUseCase {
  private readonly logger = new Logger(FetchUsersUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UserRepository,
  ) {}

  async execute({
    limit = 1,
    offset = 20,
  }: FetchUsersUseCaseRequest): Promise<FetchUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({
      limit,
      offset,
    });

    return { users };
  }
}
