// src/application/room/room.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

import { CreateRoomUseCase } from './use-cases/create-room.use-case';
import { EditRoomUseCase } from './use-cases/edit-room.use-case';
import { FetchRoomsUseCase } from './use-cases/fetch-rooms.use-case';
import { GetRoomUseCase } from './use-cases/get-room.use-case';
import { DeleteRoomUseCase } from './use-cases/delete-room.use-case';

import { CreateRoomDto } from './dto/create-room.dto';
import { EditRoomDto } from './dto/edit-room.dto';

import { ApiResponses } from 'src/core/response/response.decorator';
import { getResponseExamples } from 'src/core/response/response.examples';
import { RESPONSE } from 'src/core/response/response.messages';
import { RoomPresenter } from './room.presenter';

@ApiTags('Rooms')
@ApiSecurity('Api-Key')
@Controller('rooms')
export class RoomController {
  constructor(
    private readonly createRoomUseCase: CreateRoomUseCase,
    private readonly editRoomUseCase: EditRoomUseCase,
    private readonly fetchRoomsUseCase: FetchRoomsUseCase,
    private readonly getRoomUseCase: GetRoomUseCase,
    private readonly deleteRoomUseCase: DeleteRoomUseCase,
  ) {}

  @ApiOperation({ summary: 'Criar uma nova sala' })
  @ApiResponses(getResponseExamples('create-room'))
  @Post()
  async create(@Body() body: CreateRoomDto) {
    const result = await this.createRoomUseCase.execute(body);

    return {
      message: RESPONSE.ROOMS.CREATED_SUCCESSFULLY,
      data: {
        room: RoomPresenter.toHTTP(result.room),
      },
    };
  }

  @ApiOperation({ summary: 'Editar uma sala' })
  @ApiResponses(getResponseExamples('edit-room'))
  @Put(':id')
  async edit(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: EditRoomDto,
  ) {
    const result = await this.editRoomUseCase.execute({
      id,
      ...body,
    });

    return {
      message: RESPONSE.ROOMS.UPDATED_SUCCESSFULLY,
      data: {
        room: RoomPresenter.toHTTP(result.room),
      },
    };
  }

  @ApiOperation({ summary: 'Listar salas' })
  @ApiResponses(getResponseExamples('fetch-rooms'))
  @Get()
  async fetch(
    @Query('limit') limit = 20,
    @Query('offset') offset = 0,
  ) {
    const result = await this.fetchRoomsUseCase.execute({
      limit: Number(limit),
      offset: Number(offset),
    });

    return {
      message: RESPONSE.ROOMS.FETCHED_SUCCESSFULLY,
      data: {
        rooms: result.rooms.map(RoomPresenter.toHTTP),
      },
    };
  }

  @ApiOperation({ summary: 'Buscar sala por ID' })
  @ApiResponses(getResponseExamples('get-room'))
  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const result = await this.getRoomUseCase.execute({ id });

    return {
      message: RESPONSE.ROOMS.FOUND_SUCCESSFULLY,
      data: {
        room: RoomPresenter.toHTTP(result.room),
      },
    };
  }

  @ApiOperation({ summary: 'Deletar sala' })
  @ApiResponses(getResponseExamples('delete-room'))
  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.deleteRoomUseCase.execute({ id });

    return {
      message: RESPONSE.ROOMS.DELETED_SUCCESSFULLY,
      data: null,
    };
  }
}
