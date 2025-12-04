// src/application/room/dto/edit-room.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';

export class EditRoomDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  floor?: string;

  @ApiPropertyOptional()
  capacity?: number;

  @ApiPropertyOptional()
  location?: string;

  @ApiPropertyOptional({ nullable: true })
  description?: string | null;

  @ApiPropertyOptional({ example: '08:00' })
  startOperationHours?: string;

  @ApiPropertyOptional({ example: '18:00' })
  endOperationHours?: string;

  @ApiPropertyOptional({ type: [Number], example: [1, 2, 3, 4, 5] })
  weekdaysOpeningHours?: number[];

  @ApiPropertyOptional()
  active?: boolean;
}
