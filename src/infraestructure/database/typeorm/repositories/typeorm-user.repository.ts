import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository as TypeormRepository } from 'typeorm';

import { TypeormEntityRepository } from './typeorm-entity.repository';
import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class TypeormUserRepository
  extends TypeormEntityRepository<User, TypeormUserEntity>
  implements UserRepository
{
  constructor(
    @InjectRepository(TypeormUserEntity)
    protected readonly userRepository: TypeormRepository<TypeormUserEntity>,
    protected readonly userMapper: UserMapper,
    protected readonly config: ConfigService,
  ) {
    super(userRepository, userMapper, config);
  }
  findByEmail(email: string): Promise<User | null> {
    throw new Error('Method not implemented.');
  }
}
