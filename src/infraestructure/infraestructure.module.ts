// src/infraestructure/infraestructure.module.ts
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseModule } from './database/database.module'
import {
  USER_REPOSITORY,
} from 'src/core/tokens/repository.tokens'

// 🧩 ENTIDADES
import { TypeormUserEntity } from './database/typeorm/entities/typeorm-user.entity'

// 🧩 REPOSITÓRIOS
import { TypeormUserRepository } from './database/typeorm/repositories/typeorm-user.repository'

// 🧠 Mappers
import { UserMapper } from './database/typeorm/mappers/user.mapper'

// 🧩 Tokens -> Implementações
const REPOSITORIES = [
  { provide: USER_REPOSITORY, useClass: TypeormUserRepository },
]

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      TypeormUserEntity,
    ]),
  ],
  providers: [...REPOSITORIES, UserMapper],
  exports: [...REPOSITORIES],
})
export class InfraestructureModule { }
