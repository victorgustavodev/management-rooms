// src/application/room/use-cases/fetch-rooms.use-case.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ROOM_REPOSITORY } from 'src/core/tokens/repository.tokens';
import { Room } from 'src/domain/entities/room.entity';
import type { RoomRepository } from 'src/domain/repositories/room.repository';

export interface FetchRoomsUseCaseRequest {
  limit?: number;
  offset?: number;
}

export interface FetchRoomsUseCaseResponse {
  rooms: Room[];
}

@Injectable()
export class FetchRoomsUseCase {
  private readonly logger = new Logger(FetchRoomsUseCase.name);

  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomsRepository: RoomRepository,
  ) {}

  async execute({
    limit = 20,
    offset = 0,
  }: FetchRoomsUseCaseRequest): Promise<FetchRoomsUseCaseResponse> {
    const rooms = await this.roomsRepository.findMany({ limit, offset });
    return { rooms };
  }
}
