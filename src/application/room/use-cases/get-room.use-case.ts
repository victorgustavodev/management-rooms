// src/application/room/use-cases/get-room.use-case.ts
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ROOM_REPOSITORY } from 'src/core/tokens/repository.tokens';
import { Room } from 'src/domain/entities/room.entity';
import type { RoomRepository } from 'src/domain/repositories/room.repository';

export interface GetRoomUseCaseRequest {
  id: string;
}

export interface GetRoomUseCaseResponse {
  room: Room;
}

@Injectable()
export class GetRoomUseCase {
  private readonly logger = new Logger(GetRoomUseCase.name);

  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomsRepository: RoomRepository,
  ) {}

  async execute({ id }: GetRoomUseCaseRequest): Promise<GetRoomUseCaseResponse> {
    const room = await this.roomsRepository.findById(id);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    return { room };
  }
}
