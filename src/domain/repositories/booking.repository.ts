
import { Repository } from 'src/core/repositories/repository'

import { Booking } from '../entities/booking.entity'

export interface BookingRepository extends Repository<Booking> {
  findOverlappingBooking()
}
