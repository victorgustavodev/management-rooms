// src/domain/repositories/room.repository.ts
import { Repository } from 'src/core/repositories/repository';
import { Room } from 'src/domain/entities/room.entity';

export interface RoomRepository extends Repository<Room> {
  findByName(name: string): Promise<Room | null>;
}
