// src/application/room/use-cases/edit-room.use-case.ts
import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ROOM_REPOSITORY } from 'src/core/tokens/repository.tokens';
import { Room } from 'src/domain/entities/room.entity';
import type { RoomRepository } from 'src/domain/repositories/room.repository';

export interface EditRoomUseCaseRequest {
  id: string;
  name?: string;
  floor?: string;
  capacity?: number;
  location?: string;
  description?: string | null;
  startOperationHours?: string;
  endOperationHours?: string;
  weekdaysOpeningHours?: number[];
  active?: boolean;
}

export interface EditRoomUseCaseResponse {
  room: Room;
}

@Injectable()
export class EditRoomUseCase {
  private readonly logger = new Logger(EditRoomUseCase.name);

  constructor(
    @Inject(ROOM_REPOSITORY)
    private readonly roomsRepository: RoomRepository,
  ) {}

  async execute({
    id,
    name,
    floor,
    capacity,
    location,
    description,
    startOperationHours,
    endOperationHours,
    weekdaysOpeningHours,
    active,
  }: EditRoomUseCaseRequest): Promise<EditRoomUseCaseResponse> {
    const room = await this.roomsRepository.findById(id);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    if (name !== undefined) room.name = name;
    if (floor !== undefined) room.floor = floor;
    if (capacity !== undefined) room.capacity = capacity;
    if (location !== undefined) room.location = location;
    if (description !== undefined) room.description = description;
    if (startOperationHours !== undefined) room.startOperationHours = startOperationHours;
    if (endOperationHours !== undefined) room.endOperationHours = endOperationHours;
    if (weekdaysOpeningHours !== undefined) room.weekdaysOpeningHours = weekdaysOpeningHours;
    if (active !== undefined) room.active = active;

    await this.roomsRepository.save(room);

    return { room };
  }
}
