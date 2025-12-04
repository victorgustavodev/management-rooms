import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetUserDto {
  @ApiProperty({
    example: 'a1b2c3d4',
    description: 'ID do usuário a ser buscado',
  })
  @IsNotEmpty({ message: 'O ID é obrigatório' })
  @IsString()
  id: string;
}
