// src/infraestructure/database/typeorm/repositories/typeorm-user.repository.ts
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
    protected readonly ormRepository: TypeormRepository<TypeormUserEntity>,
    protected readonly userMapper: UserMapper,
    protected readonly config: ConfigService,
  ) {
    super(ormRepository, userMapper, config);
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.ormRepository.findOne({ where: { email } });
    if (!entity) return null;
    return this.userMapper.toDomain(entity);
  }

  async findByRegistration(registration: string): Promise<User | null> {
    const entity = await this.ormRepository.findOne({
      where: { registration },
    });
    if (!entity) return null;
    return this.userMapper.toDomain(entity);
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const entity = await this.ormRepository.findOne({ where: { cpf } });
    if (!entity) return null;
    return this.userMapper.toDomain(entity);
  }
}
