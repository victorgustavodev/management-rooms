
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { InfraestructureModule } from 'src/infraestructure/infraestructure.module'
import { UserController } from './user.controller'
import { CreateUserUseCase } from './use-cases/create-user.use-case'

@Module({
  imports: [
    InfraestructureModule,
    ConfigModule
  ],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
  ],
  exports: [CreateUserUseCase]
})
export class UserModule {}