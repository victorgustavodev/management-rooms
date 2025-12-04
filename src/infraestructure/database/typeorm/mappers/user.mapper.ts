import { Injectable } from '@nestjs/common';

import { Mapper } from 'src/core/mappers/mapper';
import { UniqueEntityID } from 'src/core/entities/unique-entity-id';

import { User, UserProps } from 'src/domain/entities/user.entity';
import { TypeormUserEntity } from '../entities/typeorm-user.entity';

@Injectable()
export class UserMapper implements Mapper<User, TypeormUserEntity> {
  toDomain(persistenceEntity: TypeormUserEntity): User {
    const user = User.create(
      {
        name: persistenceEntity.name,
        email: persistenceEntity.email,
        registration: persistenceEntity.registration,
        password: persistenceEntity.password,
        departament: persistenceEntity.departament,
        phone: persistenceEntity.phone ?? undefined,
        cpf: persistenceEntity.cpf ?? undefined,
        role: persistenceEntity.role ?? undefined,
        status: persistenceEntity.status ?? undefined,
        createdAt: persistenceEntity.createdAt,
        updatedAt: persistenceEntity.updatedAt,
        deletedAt: persistenceEntity.deletedAt ?? undefined,
      } as UserProps,
    );

    // Se sua entidade de domínio usa UniqueEntityID separado
    (user as any).id = new UniqueEntityID(persistenceEntity.id);

    return user;
  }

  toPersistence(domainEntity: User): TypeormUserEntity {
    const entity = new TypeormUserEntity();

    entity.id = domainEntity.id.toString();
    entity.name = domainEntity.name;
    entity.email = domainEntity.email;
    entity.registration = domainEntity.registration;
    entity.password = domainEntity.password;
    entity.departament = domainEntity.departament;
    entity.phone = domainEntity.phone ?? undefined;
    entity.cpf = domainEntity.cpf ?? undefined;
    entity.role = domainEntity.role ?? undefined;
    entity.status = domainEntity.status ?? undefined;
    entity.createdAt = domainEntity.createdAt;
    entity.updatedAt = domainEntity.updatedAt;
    entity.deletedAt = domainEntity.deletedAt ?? null;

    return entity;
  }
}
