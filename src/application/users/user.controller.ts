import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  ParseUUIDPipe
} from '@nestjs/common'

import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger'

import { CreateUserUseCase } from './use-cases/create-user.use-case'

import { CreateUserDto } from './dtos/create-user.dto'

import { ApiResponses } from 'src/core/response/response.decorator'
import { getResponseExamples } from 'src/core/response/response.examples'
import { RESPONSE } from 'src/core/response/response.messages'
import { UserPresenter } from './user.presenter'

@ApiTags('Users')
@ApiSecurity('Api-Key')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  @ApiOperation({
    summary: 'Criar um novo usuário'
  })
  @ApiResponses(getResponseExamples('create-user'))
  @Post()
  async create(@Body() body: CreateUserDto) {
    const result = await this.createUserUseCase.execute(body)

    return {
      message: RESPONSE.USERS.CREATED_SUCCESSFULLY,
      data: {
        user: UserPresenter.toHTTP(result.user)
      }
    }
  }

}
