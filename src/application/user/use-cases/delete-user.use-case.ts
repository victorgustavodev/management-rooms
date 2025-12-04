import { Inject, Injectable, NotFoundException, Logger } from '@nestjs/common';

import { USER_REPOSITORY } from 'src/core/tokens/repository.tokens';
import type { UserRepository } from 'src/domain/repositories/user.repository';

export interface DeleteUserUseCaseRequest {
  id: string;
  actorId: string;
}

export interface DeleteUserUseCaseResponse {
  success: boolean;
}

@Injectable()
export class DeleteUserUseCase {
  private readonly logger = new Logger(DeleteUserUseCase.name);

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: UserRepository,
  ) {}

  async execute({ id, actorId }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);
    const actor = await this.usersRepository.findById(actorId);

    if(!actor){
      throw new NotFoundException('User actor not found');
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if(actor.role !== "admin") {
      console.log("Apenas usuários com permissões de 'Admin' podem deletar outros players.")
    }

    await this.usersRepository.delete(user.id.toString());

    return { success: true };
  }
}
