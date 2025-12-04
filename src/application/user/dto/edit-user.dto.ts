import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { UserRole, UserStatus } from 'src/domain/entities/user.entity';

export class EditUserDto {
  @ApiProperty({
    example: 'Augusto Ipsum',
    description: 'Nome do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    example: 'example@ex.com.br',
    description: 'Email do usuário',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'O email deve ser válido' })
  email?: string;

  @ApiProperty({
    example: '2023001234',
    description: 'Número de matrícula do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  registration?: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({
    example: 'Tecnologia da Informação',
    description: 'Departamento do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  departament?: string;

  @ApiProperty({
    example: '+55 81 99999-9999',
    description: 'Telefone do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string | null;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  cpf?: string | null;

  @ApiProperty({
    example: 'Default',
    description: 'Role do usuário',
    enum: UserRole,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({
    example: 'Active',
    description: 'Status do usuário',
    enum: UserStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
