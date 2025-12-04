import { Column, Entity } from 'typeorm';
import { TypeormEntity } from './typeorm-entity.entity';
import { UserProps, UserRole, UserStatus } from 'src/domain/entities/user.entity';

@Entity('users')
export class TypeormUserEntity extends TypeormEntity implements UserProps {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  registration: string;

  @Column()
  password: string;

  @Column()
  departament: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  cpf?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Default })
  role?: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status?: UserStatus;
}
