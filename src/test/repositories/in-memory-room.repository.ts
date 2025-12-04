// test/repositories/in-memory-room.repository.ts
import { Room } from 'src/domain/entities/room.entity';
import { RoomRepository } from 'src/domain/repositories/room.repository';

interface PaginationParams {
  limit?: number;
  offset?: number;
}

export class InMemoryRoomRepository implements RoomRepository {
  public items: Room[] = [];

  async create(room: Room): Promise<void> {
    this.items.push(room);
  }

  async save(room: Room): Promise<void> {
    const index = this.items.findIndex((r) => r.id.equals(room.id));

    if (index === -1) {
      this.items.push(room);
    } else {
      this.items[index] = room;
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((room) => room.id.toString() !== id);
  }

  async findById(id: string): Promise<Room | null> {
    const room = this.items.find((r) => r.id.toString() === id);
    return room ?? null;
  }

  async findMany({ limit, offset }: PaginationParams): Promise<Room[]> {
    const start = offset ?? 0;
    const end = limit != null ? start + limit : undefined;
    return this.items.slice(start, end);
  }

  async findByName(name: string): Promise<Room | null> {
    const room = this.items.find((r) => r.name === name);
    return room ?? null;
  }
}
