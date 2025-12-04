import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  ParseUUIDPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { GetUserUseCase } from './use-cases/get-user.use-case';
import { FetchUsersUseCase } from './use-cases/fetch-users.use-case';
import { EditUserUseCase } from './use-cases/edit-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user.use-case';

import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';
import { RESPONSE } from 'src/core/response/response.messages';
import { UserPresenter } from './user.presenter';
import { DeleteUserDto } from './dto/delete-user.dto';

@ApiTags('Users')
@ApiSecurity('Api-Key')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly fetchUsersUseCase: FetchUsersUseCase,
    private readonly editUserUseCase: EditUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @ApiOperation({
    summary: 'Criar um novo usuário',
  })
  @ApiResponses(getResponseExamples('create-user'))
  @Post()
  async create(@Body() body: CreateUserDto) {
    const result = await this.createUserUseCase.execute(body);

    return {
      message: RESPONSE.USERS.CREATED_SUCCESSFULLY,
      data: {
        user: UserPresenter.toHTTP(result.user),
      },
    };
  }

  @ApiOperation({
    summary: 'Buscar usuário por ID',
  })
  @ApiResponses(getResponseExamples('get-user'))
  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.getUserUseCase.execute({ id });

    return {
      message: RESPONSE.USERS.FOUND_SUCCESSFULLY,
      data: {
        user: UserPresenter.toHTTP(result.user),
      },
    };
  }

  @ApiOperation({
    summary: 'Listar usuários',
  })
  @ApiResponses(getResponseExamples('fetch-users'))
  @Get()
  async fetch(
    @Query('page') page = 1,
    @Query('perPage') perPage = 20,
  ) {
    const result = await this.fetchUsersUseCase.execute({
      limit: Number(page),
      offset: Number(perPage),
    });

    return {
      message: RESPONSE.USERS.FETCHED_SUCCESSFULLY,
      data: {
        users: result.users.map(UserPresenter.toHTTP),
      },
    };
  }

  @ApiOperation({
    summary: 'Editar usuário',
  })
  @ApiResponses(getResponseExamples('edit-user'))
  @Put(':id')
  async edit(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: EditUserDto,
  ) {
    const result = await this.editUserUseCase.execute({
      id,
      ...body,
    });

    return {
      message: RESPONSE.USERS.UPDATED_SUCCESSFULLY,
      data: {
        user: UserPresenter.toHTTP(result.user),
      },
    };
  }
@ApiOperation({
  summary: 'Deletar usuário',
})
@ApiResponses(getResponseExamples('delete-user'))
@Delete(':id')
async delete(
  @Param('id', new ParseUUIDPipe()) id: string,
  @Body() body: DeleteUserDto,
) {
  await this.deleteUserUseCase.execute({
    id,
    actorId: body.actorId,
  });

  return {
    message: RESPONSE.USERS.DELETED_SUCCESSFULLY,
    data: null,
  };
}

}