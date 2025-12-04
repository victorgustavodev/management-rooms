import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Matches, Min, IsArray } from 'class-validator'

export class CreateRoomDto {
  @ApiProperty({ example: 'SALA-01', description: 'Código único da sala' })
  @IsString()
  @IsNotEmpty()
  code: string

  @ApiProperty({ example: 'Sala de Reunião A', description: 'Nome da sala' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiPropertyOptional({ example: '2º Andar' })
  @IsOptional()
  @IsString()
  floor?: string

  @ApiProperty({ example: 10, description: 'Capacidade máxima de pessoas' })
  @IsInt()
  @Min(1)
  capacity: number

  @ApiPropertyOptional({ example: 'Bloco B' })
  @IsOptional()
  @IsString()
  location?: string

  @ApiPropertyOptional({ example: 'Sala com projetor e quadro branco' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiPropertyOptional({ example: '08:00', pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$' })
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Formato deve ser HH:MM' })
  workingHoursStart?: string

  @ApiPropertyOptional({ example: '18:00', pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$' })
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'Formato deve ser HH:MM' })
  workingHoursEnd?: string

  @ApiPropertyOptional({ example: [1, 2, 3, 4, 5], description: 'Dias úteis (1=Seg, 5=Sex)' })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  workingDays?: number[]

  @ApiPropertyOptional({ example: 15, default: 15 })
  @IsOptional()
  @IsInt()
  @Min(5)
  minDurationMinutes?: number

  @ApiPropertyOptional({ example: 8, default: 8 })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxDurationHours?: number

  @ApiPropertyOptional({ example: 365, default: 365 })
  @IsOptional()
  @IsInt()
  maxAdvanceBookingDays?: number
}