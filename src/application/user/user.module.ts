
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InfraestructureModule } from 'src/infraestructure/infraestructure.module'
import { UserController } from './user.controller'
import { CreateUserUseCase } from './use-cases/create-user.use-case'
import { EditUserUseCase } from './use-cases/edit-user.use-case'
import { FetchUsersUseCase } from './use-cases/fetch-users.use-case'
import { GetUserUseCase } from './use-cases/get-user.use-case'
import { DeleteUserUseCase } from './use-cases/delete-user.use-case'

@Module({
  imports: [
    InfraestructureModule,
    ConfigModule
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    EditUserUseCase,
    FetchUsersUseCase,
    GetUserUseCase,
    DeleteUserUseCase
  ],
  exports: [CreateUserUseCase]
})
export class UserModule {}