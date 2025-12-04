import { ApiProperty } from '@nestjs/swagger'

import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({
    example: 'Fulano de Tal',
    description: 'Nome completo do usuário'
  })
  @IsString()
  @Length(3, 100)
  name: string

  @ApiProperty({
    example: 'exemplo@gmail.com',
    description: 'Email do usuário'
  })
  @IsEmail()
  @IsNotEmpty()
  email: string

  @ApiProperty({
    example: '473',
    description: 'Número de inscrição do usuário'
  })
  @IsString()
  @IsNotEmpty()
  registration:string

  @ApiProperty({
    example: 'active',
    description: 'Status do usuário',
    enum: ['active', 'inactive']
  })
  @IsString()
  @Matches(/^(active|inactive)$/, {
    message: 'Status deve ser "active" ou "inactive"'
  })
  status: 'active' | 'inactive'
}
