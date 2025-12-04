import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteUserDto {
  @ApiProperty({
    example: 'a1b2c3d4',
    description: 'ID do usuário que está deletando',
  })
  @IsNotEmpty({ message: 'O ID é obrigatório' })
  @IsString()
  actorId: string;
}
