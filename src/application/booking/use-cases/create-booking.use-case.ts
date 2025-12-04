// import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
// import { Booking, BookingProps, BookingStatus } from 'src/domain/entities/booking.entity'
// import { BOOKING_REPOSITORY, ROOM_REPOSITORY } from 'src/core/tokens/repository.tokens'
// import type { BookingRepository } from 'src/domain/repositories/booking.repository'
// import type { RoomRepository } from 'src/domain/repositories/room.repository'

// export interface CreateBookingUseCaseRequest {
//   roomId: string
//   userId: string
//   title: string
//   description?: string
//   start: Date
//   end: Date
//   status: BookingStatus
// }

// export interface CreateBookingUseCaseResponse {
//   booking: Booking
// }

// @Injectable()
// export class CreateBookingUseCase {
//   constructor(
//     @Inject(BOOKING_REPOSITORY)
//     private bookingRepository: BookingRepository,
//     @Inject(ROOM_REPOSITORY)
//     private roomRepository: RoomRepository
//   ) {}

//   async execute(request: CreateBookingUseCaseRequest): Promise<CreateBookingUseCaseResponse> {
//     const { start, end, roomId } = request

//     // 1. Validação básica de data
//     if (start >= end) {
//       throw new BadRequestException('Start date must be before end date')
//     }

//     // 2. Verificar se a sala existe e está ativa
//     const room = await this.roomRepository.findById(roomId)
//     if (!room) {
//       throw new NotFoundException('Room not found')
//     }
//     // if (!room.isActive) {
//     //     throw new BadRequestException('Cannot book an inactive room')
//     // }

//     // 3. Verificar conflito de horário (Overlapping)
//     // Este método deve ser implementado no repositório com a query:
//     // WHERE room_id = ? AND status != 'canceled' AND (start < requestedEnd AND end > requestedStart)
//     // const conflictingBooking = await this.bookingRepository.findOverlappingBooking(
//     //   roomId, 
//     //   start, 
//     //   end
//     // )

//     // if (conflictingBooking) {
//     //   throw new ConflictException('Room is already booked for this time slot')
//     // }

//     // 4. Criação da entidade
//     const booking = Booking.create({
//       roomId: request.roomId,
//       userId: request.userId,
//       title: request.title,
//       description: request.description,
//       start: request.start,
//       end: request.end,
//       status: BookingStatus.Confirmed
//     } as BookingProps)

//     await this.bookingRepository.save(booking)

//     return { booking }
//   }
// }