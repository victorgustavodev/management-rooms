// src/application/room/use-cases/create-room.use-case.ts
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common';
import { ROOM_REPOSITORY } from 'src/core/tokens/repository.tokens';
import { Room, RoomProps } from 'src/domain/entities/room.entity';
import type { RoomRepository } from 'src/domain/repositories/room.repository';

export interface CreateRoomUseCaseRequest{
  code: string
  name: string
  floor?: string
  capacity: number
  location?: string | undefined
  description?: string
  workingHoursStart?: string
  workingHoursEnd?: string
  workingDays?: number[]
}

export interface CreateRoomUseCaseResponse {
  room: Room;
}

@Injectable()
export class CreateRoomUseCase {
  private readonly logger = new Logger(CreateRoomUseCase.name);

  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomsRepository: RoomRepository,
  ) {}

  async execute(request: CreateRoomUseCaseRequest): Promise<CreateRoomUseCaseResponse> {
  const existing = await this.roomsRepository.findByName(request.name);
  if (existing) {
    throw new ConflictException('Room with this name already exists');
  }

  const room = Room.create({
    name: request.name,
    floor: request.floor ?? '',
    capacity: request.capacity,
    location: request.location,
    description: request.description ?? null,
    startOperationHours: request.workingHoursStart ?? '07:30',
    endOperationHours: request.workingHoursEnd ?? '17:18',
    weekdaysOpeningHours: request.workingDays ?? [1, 2, 3, 4, 5],
    active: true,
  } as RoomProps);

  await this.roomsRepository.create(room);

  return { room };
}
}
