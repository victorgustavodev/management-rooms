import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';

import { USER_REPOSITORY } from 'src/core/tokens/repository.tokens';
import type { UserRepository } from 'src/domain/repositories/user.repository';
import { User } from 'src/domain/entities/user.entity';

export interface GetUserUseCaseRequest {
  id: string;
}

export interface GetUserUseCaseResponse {
  user: User;
}

@Injectable()
export class GetUserUseCase {
  private readonly logger = new Logger(GetUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UserRepository,
  ) {}

  async execute({ id }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { user };
  }
}
