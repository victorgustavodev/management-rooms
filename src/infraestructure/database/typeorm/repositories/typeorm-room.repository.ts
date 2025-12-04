// src/infraestructure/database/typeorm/repositories/typeorm-room.repository.ts
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
    protected readonly ormRepository: TypeormRepository<TypeormRoomEntity>,
    protected readonly roomMapper: RoomMapper,
    protected readonly config: ConfigService,
  ) {
    super(ormRepository, roomMapper, config);
  }

  async findByName(name: string): Promise<Room | null> {
    const entity = await this.ormRepository.findOne({ where: { name } });
    if (!entity) return null;
    return this.roomMapper.toDomain(entity);
  }
}
