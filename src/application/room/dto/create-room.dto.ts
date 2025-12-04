import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    example: 'SALA-01',
    description: 'Código único identificador da sala',
  })
  @IsString()
  @IsNotEmpty({ message: 'O código da sala é obrigatório' })
  code: string;

  @ApiProperty({
    example: 'Sala de Reunião A',
    description: 'Nome da sala',
  })
  @IsString()
  @IsNotEmpty({ message: 'O nome da sala é obrigatório' })
  name: string;

  @ApiPropertyOptional({
    example: '2º Andar',
    description: 'Andar onde a sala está localizada',
  })
  @IsOptional()
  @IsString()
  floor?: string;

  @ApiProperty({
    example: 10,
    description: 'Capacidade máxima de pessoas na sala',
  })
  @IsInt({ message: 'A capacidade deve ser um número inteiro' })
  @Min(1, { message: 'A capacidade mínima é 1 pessoa' })
  capacity: number;

  @ApiPropertyOptional({
    example: 'Bloco B',
    description: 'Bloco ou área do prédio onde a sala se encontra',
  })
  @IsOptional()
  @IsString()
  location?: string;

  @ApiPropertyOptional({
    example: 'Sala com projetor, ar-condicionado e quadro branco',
    description: 'Descrição e recursos disponíveis na sala',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '08:00',
    description: 'Horário de início de funcionamento da sala (formato HH:MM)',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'O horário de início deve estar no formato HH:MM',
  })
  workingHoursStart?: string;

  @ApiPropertyOptional({
    example: '18:00',
    description: 'Horário de término de funcionamento da sala (formato HH:MM)',
    pattern: '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$',
  })
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'O horário de término deve estar no formato HH:MM',
  })
  workingHoursEnd?: string;

  @ApiPropertyOptional({
    example: [1, 2, 3, 4, 5],
    description: 'Dias de funcionamento (1 = Segunda, 7 = Domingo)',
  })
  @IsOptional()
  @IsArray({ message: 'Os dias de funcionamento devem ser uma lista de números' })
  @IsInt({ each: true, message: 'Cada dia deve ser um número inteiro' })
  workingDays?: number[];

  @ApiPropertyOptional({
    example: 15,
    default: 15,
    description:
      'Duração mínima de uma reserva, em minutos (padrão: 15 minutos)',
  })
  @IsOptional()
  @IsInt({ message: 'A duração mínima deve ser um número inteiro' })
  @Min(5, { message: 'A duração mínima deve ser de pelo menos 5 minutos' })
  minDurationMinutes?: number;

  @ApiPropertyOptional({
    example: 8,
    default: 8,
    description:
      'Duração máxima de uma reserva, em horas (padrão: 8 horas)',
  })
  @IsOptional()
  @IsInt({ message: 'A duração máxima deve ser um número inteiro' })
  @Min(1, { message: 'A duração máxima deve ser de pelo menos 1 hora' })
  maxDurationHours?: number;

  @ApiPropertyOptional({
    example: 365,
    default: 365,
    description:
      'Quantidade máxima de dias de antecedência para realizar uma reserva',
  })
  @IsOptional()
  @IsInt({ message: 'O limite de antecedência deve ser um número inteiro' })
  @Min(1, { message: 'O limite de antecedência deve ser de pelo menos 1 dia' })
  maxAdvanceBookingDays?: number;
}
