import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserRole, UserStatus } from 'src/domain/entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'Augusto Ipsum',
    description: 'Nome do usuário',
  })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({
    example: 'example@ex.com.br',
    description: 'Email do usuário',
  })
  @IsNotEmpty({ message: 'O email é obrigatório' })
  @IsEmail({}, { message: 'O email deve ser válido' })
  email: string;

  @ApiProperty({
    example: '2023001234',
    description: 'Número de matrícula do usuário',
  })
  @IsNotEmpty({ message: 'A matrícula é obrigatória' })
  @IsString()
  registration: string;

  @ApiProperty({
    example: '123456',
    description: 'Senha do usuário',
  })
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'Tecnologia da Informação',
    description: 'Departamento do usuário',
  })
  @IsNotEmpty({ message: 'O departamento é obrigatório' })
  @IsString()
  departament: string;

  @ApiProperty({
    example: '+55 81 99999-9999',
    description: 'Telefone do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({
    example: '123.456.789-00',
    description: 'CPF do usuário',
    required: false,
  })
  @IsOptional()
  @IsString()
  cpf?: string;

  @ApiProperty({
    example: 'Default',
    description: 'Role do usuário',
    enum: UserRole,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole = UserRole.Default;

  @ApiProperty({
    example: 'Active',
    description: 'Status do usuário',
    enum: UserStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus = UserStatus.Active;
}
