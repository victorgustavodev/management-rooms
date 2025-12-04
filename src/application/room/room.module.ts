// room.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ROOM_REPOSITORY } from 'src/core/tokens/repository.tokens';
import { RoomController } from './room.controller';
import { CreateRoomUseCase } from './use-cases/create-room.use-case';
import { EditRoomUseCase } from './use-cases/edit-room.use-case';
import { FetchRoomsUseCase } from './use-cases/fetch-rooms.use-case';
import { GetRoomUseCase } from './use-cases/get-room.use-case';
import { DeleteRoomUseCase } from './use-cases/delete-room.use-case';

import { TypeormRoomEntity } from 'src/infraestructure/database/typeorm/entities/typeorm-room.entity';
import { TypeormRoomRepository } from 'src/infraestructure/database/typeorm/repositories/typeorm-room.repository';
import { RoomMapper } from 'src/infraestructure/database/typeorm/mappers/room.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeormRoomEntity]),
  ],
  controllers: [RoomController],
  providers: [
    // use cases
    CreateRoomUseCase,
    EditRoomUseCase,
    FetchRoomsUseCase,
    GetRoomUseCase,
    DeleteRoomUseCase,

    // mapper
    RoomMapper,

    // binding do token para implementação concreta
    {
      provide: ROOM_REPOSITORY,
      useClass: TypeormRoomRepository,
    },
  ],
  exports: [
    {
      provide: ROOM_REPOSITORY,
      useClass: TypeormRoomRepository,
    },
  ],
})
export class RoomModule {}
