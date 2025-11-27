import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { TypeormEntity } from './typeorm-entity.entity'

export enum UserRole { Admin = 'admin', Default = 'default', Mentor = 'mentor' }
export enum UserStatus { Active = 'active', Inactive = 'inactive' }

@Entity('users')
export class TypeormUserEntity extends TypeormEntity {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  registration: string

  @Column({ nullable: true })
  phone?: string

  @Column({ nullable: true })
  cpf?: string

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Default })
  role: UserRole

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Active })
  status: UserStatus

}
