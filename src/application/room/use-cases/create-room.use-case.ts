
import { ConflictException, Inject, Injectable, Logger } from '@nestjs/common'

// Você precisará criar a interface do repositório
import { Room } from 'src/domain/entities/room.entity'
import { ROOM_REPOSITORY } from 'src/core/tokens/repository.tokens'
import type { RoomRepository } from 'src/domain/repositories/room.repository'

// Reutilizamos o DTO ou criamos uma interface pura para desacoplar (recomendado interface)
export interface CreateRoomUseCaseRequest {
  code: string
  name: string
  floor?: string
  capacity: number
  location?: string
  description?: string
  workingHoursStart?: string
  workingHoursEnd?: string
  workingDays?: number[]
  minDurationMinutes?: number
  maxDurationHours?: number
  maxAdvanceBookingDays?: number
}

export interface CreateRoomUseCaseResponse {
  room: Room
}

@Injectable()
export class CreateRoomUseCase {
  private readonly logger = new Logger(CreateRoomUseCase.name)

  constructor(
    @Inject(ROOM_REPOSITORY)
    private roomsRepository: RoomRepository
  ) {}

  async execute(request: CreateRoomUseCaseRequest): Promise<CreateRoomUseCaseResponse> {
    // Verifica duplicidade pelo código
    // const existingRoom = await this.roomsRepository.findByCode(request.code)

    // if (existingRoom) {
    //   throw new ConflictException('Room with this code already exists')
    // }

    const room = Room.create({
      ...request,
      minDurationMinutes: request.minDurationMinutes ?? 15,
      maxDurationHours: request.maxDurationHours ?? 8,
      maxAdvanceBookingDays: request.maxAdvanceBookingDays ?? 365,
      isActive: true
    })

    await this.roomsRepository.save(room)

    return { room }
  }
}