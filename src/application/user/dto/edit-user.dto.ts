import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, IsOptional, IsString, IsInt, Min } from 'class-validator'

export class EditPlayerDto {
  @ApiPropertyOptional({
    description: 'Nome do jogador',
    example: 'Augusto Ipsum',
  })
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  name?: string

  @ApiPropertyOptional({
    description: 'Email do jogador',
    example: 'example@ex.com.br',
  })
  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser válido' })
  email?: string

  @ApiPropertyOptional({
    description: 'Nível do jogador',
    example: 5,
  })
  @IsOptional()
  @IsInt({ message: 'O nível deve ser um número inteiro' })
  @Min(1, { message: 'O nível deve ser positivo' })
  level?: number

  @ApiPropertyOptional({
    description: 'Experiência (XP) do jogador',
    example: 1000,
  })
  @IsOptional()
  @IsInt({ message: 'O XP deve ser um número inteiro' })
  @Min(0, { message: 'O XP não pode ser negativo' })
  xp?: number

  @ApiPropertyOptional({
    description: 'Quantidade de moedas do jogador',
    example: 500,
  })
  @IsOptional()
  @IsInt({ message: 'As moedas devem ser um número inteiro' })
  @Min(0, { message: 'As moedas não podem ser negativas' })
  coins?: number
}
