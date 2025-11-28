import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { 
  IsBoolean, 
  IsDate, 
  IsNotEmpty, 
  IsOptional, 
  IsString, 
  IsArray, 
  ValidateNested, 
  IsInt, 
  Min 
} from 'class-validator'

class EquipmentDto {
  @ApiProperty({ example: 'Projetor' })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  quantity: number
}

export class CreateBookingDto {
  @ApiProperty({ example: 'room-uuid-123', description: 'ID da sala' })
  @IsString()
  @IsNotEmpty()
  roomId: string

  // Geralmente pegamos o userId do token JWT, mas se for passar no body:
  @ApiProperty({ example: 'user-uuid-456', description: 'ID do usuário solicitante' })
  @IsString()
  @IsNotEmpty()
  userId: string

  @ApiProperty({ example: 'Reunião de Alinhamento Trimestral' })
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiPropertyOptional({ example: 'Discussão sobre metas Q3' })
  @IsOptional()
  @IsString()
  description?: string

  @ApiProperty({ example: '2023-10-25T14:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  start: Date

  @ApiProperty({ example: '2023-10-25T16:00:00.000Z' })
  @IsDate()
  @Type(() => Date)
  end: Date

  @ApiPropertyOptional({ type: [EquipmentDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EquipmentDto)
  equipmentRequirements?: EquipmentDto[]

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  cateringRequired?: boolean
}