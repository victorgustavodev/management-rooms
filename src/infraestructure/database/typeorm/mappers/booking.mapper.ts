import { Injectable } from '@nestjs/common';
import { Mapper } from 'src/core/mappers/mapper';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

import { Booking, BookingProps } from 'src/domain/entities/booking.entity';
import { TypeormBookingEntity } from '../entities/typeorm-booking.entity';

@Injectable()
export class BookingMapper implements Mapper<Booking, TypeormBookingEntity> {
  toDomain(persistenceEntity: TypeormBookingEntity): Booking {
    return Booking.create(
      {
        roomId: persistenceEntity.roomId,
        userId: persistenceEntity.userId,
        title: persistenceEntity.title,
        description: persistenceEntity.description ?? undefined,
        start: persistenceEntity.start,
        end: persistenceEntity.end,
        status: persistenceEntity.status as BookingProps['status'],
        createdAt: persistenceEntity.createdAt,
        updatedAt: persistenceEntity.updatedAt,
        deletedAt: persistenceEntity.deletedAt ?? undefined,
      } as BookingProps,
      new UniqueEntityID(persistenceEntity.id),
    );
  }

  toPersistence(domainEntity: Booking): TypeormBookingEntity {
    const entity = new TypeormBookingEntity();

    entity.id = domainEntity.id.toString();
    entity.roomId = domainEntity.roomId;
    entity.userId = domainEntity.userId;
    entity.title = domainEntity.title;
    entity.description = domainEntity.description ?? undefined;
    entity.start = domainEntity.start;
    entity.end = domainEntity.end;
    entity.status = domainEntity.status;
    entity.createdAt = domainEntity.createdAt;
    entity.updatedAt = domainEntity.updatedAt;
    entity.deletedAt = domainEntity.deletedAt ?? null;

    return entity;
  }
}
