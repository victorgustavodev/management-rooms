import {
  Inject,
  Injectable,
  NotFoundException,
  Logger,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';

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

  async execute({
    id,
    actorId,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const [user, actor] = await Promise.all([
      this.usersRepository.findById(id),
      this.usersRepository.findById(actorId),
    ]);

    if (!actor) {
      throw new NotFoundException('Usuário autenticado (actor) não encontrado');
    }

    if (!user) {
      throw new NotFoundException('Usuário a ser deletado não encontrado');
    }

    if (actorId === id) {
      throw new ConflictException(
        'Você não pode deletar o seu próprio usuário',
      );
    }

    if (actor.role !== 'admin') {
      throw new ForbiddenException(
        'Apenas usuários com perfil de administrador podem deletar outros usuários',
      );
    }

    await this.usersRepository.delete(user.id.toString());

    this.logger.log(
      `Usuário ${user.id.toString()} deletado por ${actor.id.toString()}`,
    );

    return { success: true };
  }
}
