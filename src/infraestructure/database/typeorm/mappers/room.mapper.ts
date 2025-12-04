import { Injectable } from '@nestjs/common';
import { Mapper } from 'src/core/mappers/mapper';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

import { Room, RoomProps } from 'src/domain/entities/room.entity';
import { TypeormRoomEntity } from '../entities/typeorm-room.entity';

@Injectable()
export class RoomMapper implements Mapper<Room, TypeormRoomEntity> {
  toDomain(persistenceEntity: TypeormRoomEntity): Room {
    return Room.create(
      {
        name: persistenceEntity.name,
        floor: persistenceEntity.floor,
        capacity: persistenceEntity.capacity,
        location: persistenceEntity.location,
        description: persistenceEntity.description ?? undefined,
        startOperationHours: persistenceEntity.startOperationHours,
        endOperationHours: persistenceEntity.endOperationHours,
        weekdaysOpeningHours: persistenceEntity.weekdaysOpeningHours,
        active: persistenceEntity.active,
        createdAt: persistenceEntity.createdAt,
        updatedAt: persistenceEntity.updatedAt,
        deletedAt: persistenceEntity.deletedAt ?? undefined,
      // se RoomProps tiver id: UniqueEntityID, passe aqui:
      // id: new UniqueEntityID(persistenceEntity.id),
    } as RoomProps);
  }

  toPersistence(domainEntity: Room): TypeormRoomEntity {
    const entity = new TypeormRoomEntity();

    entity.id = domainEntity.id.toString();
    entity.name = domainEntity.name;
    entity.floor = domainEntity.floor;
    entity.capacity = domainEntity.capacity;
    entity.location = domainEntity.location;
    entity.description = domainEntity.description ?? undefined;
    entity.startOperationHours = domainEntity.startOperationHours;
    entity.endOperationHours = domainEntity.endOperationHours;
    entity.weekdaysOpeningHours = domainEntity.weekdaysOpeningHours;
    entity.active = domainEntity.active;
    entity.createdAt = domainEntity.createdAt;
    entity.updatedAt = domainEntity.updatedAt;
    entity.deletedAt = domainEntity.deletedAt ?? null;

    return entity;
  }
}
