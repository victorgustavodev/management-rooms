import { Injectable } from '@nestjs/common'

import { Mapper } from 'src/core/mappers/mapper'
import { UniqueEntityID } from 'src/core/entities/unique-entity-id'

import { User, UserProps } from 'src/domain/entities/user.entity'
import { TypeormUserEntity } from '../entities/typeorm-user.entity'

@Injectable()
export class UserMapper implements Mapper<User, TypeormUserEntity> {
  toDomain(persistenceEntity: TypeormUserEntity): User {
    return User.create({
      id: new UniqueEntityID(persistenceEntity.id),
      name: persistenceEntity.name,
      registration: persistenceEntity.registration,
      email: persistenceEntity.email,
      status: persistenceEntity.status as UserProps['status'],
      createdAt: persistenceEntity.createdAt,
      updatedAt: persistenceEntity.updatedAt,
      deletedAt: persistenceEntity.deletedAt
    })
  }

  toPersistence(domainEntity: User): TypeormUserEntity {
    const entity = new TypeormUserEntity()

    entity.id = domainEntity.id.toString()
    entity.name = domainEntity.name
    entity.registration = domainEntity.registration
    entity.email = domainEntity.email
    entity.status = domainEntity.status
    entity.createdAt = domainEntity.createdAt
    entity.updatedAt = domainEntity.updatedAt
    entity.deletedAt = domainEntity.deletedAt

    return entity
  }
}
