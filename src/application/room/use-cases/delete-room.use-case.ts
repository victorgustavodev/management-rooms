// src/application/room/use-cases/delete-room.use-case.ts
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ROOM_REPOSITORY } from 'src/core/tokens/repository.tokens';
import type { RoomRepository } from 'src/domain/repositories/room.repository';

export interface DeleteRoomUseCaseRequest {
  id: string;
}

export interface DeleteRoomUseCaseResponse {
  success: boolean;
}

@Injectable()
export class DeleteRoomUseCase {
  private readonly logger = new Logger(DeleteRoomUseCase.name);

  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomsRepository: RoomRepository,
  ) {}

  async execute({ id }: DeleteRoomUseCaseRequest): Promise<DeleteRoomUseCaseResponse> {
    const room = await this.roomsRepository.findById(id);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    await this.roomsRepository.delete(id);

    return { success: true };
  }
}
