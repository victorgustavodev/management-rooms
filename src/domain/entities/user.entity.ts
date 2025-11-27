import { Entity, EntityMetadata } from '../../core/entities/entity'

export enum UserRole {
  Admin = 'admin',
  Default = 'default'
}

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive'
}

export interface UserProps {
  name: string
  email: string
  registration: string
  phone?: string
  cpf?: string
  role?: UserRole
  status?: UserStatus
}

export class User extends Entity<UserProps> {
  get name(): string {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get registration():string {
    return this.props.registration
  }

  set registration(registrationNumber:string) {
    this.props.registration = registrationNumber
  }

  get phone(): string | null | undefined {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
  }

  get cpf(): string | null | undefined {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  get role(): UserRole {
    if (!this.props.role) {
      this.props.role = UserRole.Default
    }
    return this.props.role
  }

  set role(role: UserRole) {
    this.props.role = role
  }

  get status(): UserStatus {
    if (!this.props.status) {
      this.props.status = UserStatus.Active
    }
    return this.props.status
  }

  set status(status: UserStatus) {
    this.props.status = status
  }

  static create(props: UserProps & Partial<EntityMetadata>): User {
    const user = new User(props)
    return user
  }
}
