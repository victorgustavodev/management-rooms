import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeormRepository } from 'typeorm';

import { TypeormEntityRepository } from './typeorm-entity.repository';
import { Room } from 'src/domain/entities/room.entity';
import { RoomRepository } from 'src/domain/repositories/room.repository';
import { TypeormRoomEntity } from '../entities/typeorm-room.entity';
import { RoomMapper } from '../mappers/room.mapper';

@Injectable()
export class TypeormRoomRepository
  extends TypeormEntityRepository<Room, TypeormRoomEntity>
  implements RoomRepository
{
  constructor(
    @InjectRepository(TypeormRoomEntity)
    protected readonly roomRepository: TypeormRepository<TypeormRoomEntity>,
    protected readonly roomMapper: RoomMapper,
    protected readonly config: ConfigService,
  ) {
    super(roomRepository, roomMapper, config);
  }
}
