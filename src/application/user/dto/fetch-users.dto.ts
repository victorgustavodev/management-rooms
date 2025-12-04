import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class FetchUsersDto {
  @ApiProperty({
    example: 10,
    description: 'Quantidade máxima de registros a serem retornados',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  limit?: number = 1;

  @ApiProperty({
    example: 0,
    description: 'Offset para paginação',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  offset?: number = 20;
}
