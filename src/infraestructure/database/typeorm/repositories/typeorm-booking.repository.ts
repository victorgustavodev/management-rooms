import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeormRepository } from 'typeorm';

import { TypeormEntityRepository } from './typeorm-entity.repository';
import { Booking } from 'src/domain/entities/booking.entity';
import { BookingRepository } from 'src/domain/repositories/booking.repository';
import { TypeormBookingEntity } from '../entities/typeorm-booking.entity';
import { BookingMapper } from '../mappers/booking.mapper';

@Injectable()
export class TypeormBookingRepository
  extends TypeormEntityRepository<Booking, TypeormBookingEntity>
  implements BookingRepository
{
  constructor(
    @InjectRepository(TypeormBookingEntity)
    protected readonly bookingRepository: TypeormRepository<TypeormBookingEntity>,
    protected readonly bookingMapper: BookingMapper,
    protected readonly config: ConfigService,
  ) {
    super(bookingRepository, bookingMapper, config);
  }
  findOverlappingBooking() {
    throw new Error('Method not implemented.');
  }
}
