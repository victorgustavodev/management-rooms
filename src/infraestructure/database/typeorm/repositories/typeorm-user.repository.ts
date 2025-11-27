import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'

import { User } from 'src/domain/entities/user.entity'

import { TypeormUserEntity } from '../entities/typeorm-user.entity'
import { UserMapper } from '../mappers/user.mapper'

import { TypeormEntityRepository } from './typeorm-entity.repository'
import { UserRepository } from 'src/domain/repositories/user.repository'
import { Repository as TypeormRepository } from 'typeorm'

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
    super(userRepository, userMapper, config)
  }
  findByEmail(email: string): Promise<User | null> {
    return this.userRepository
      .findOne({ where: { email } })
      .then((result) => {
        if (!result) {
          return null
        }
        return this.userMapper.toDomain(result)
      })
  }

  async findById(id: string): Promise<User | null> {
    const result = await this.userRepository.findOne({
      where: { id },
    })

    if (!result) {
      return null
    }

    return this.userMapper.toDomain(result)
  }
}
