// src/application/room/room.presenter.ts
import { Room } from 'src/domain/entities/room.entity';

export class RoomPresenter {
  static toHTTP(room: Room) {
    return {
      id: room.id.toString(),
      name: room.name,
      floor: room.floor,
      capacity: room.capacity,
      location: room.location,
      description: room.description,
      startOperationHours: room.startOperationHours,
      endOperationHours: room.endOperationHours,
      weekdaysOpeningHours: room.weekdaysOpeningHours,
      active: room.active,
      createdAt: room.createdAt,
      updatedAt: room.updatedAt,
      deletedAt: room.deletedAt,
    };
  }
}
