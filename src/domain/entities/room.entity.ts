import { Entity, EntityMetadata } from '../../core/entities/entity'

export interface RoomProps {
  code: string
  name: string
  floor?: string
  capacity: number
  location?: string
  description?: string
  // Formato HH:MM
  workingHoursStart?: string
  workingHoursEnd?: string
  // Array de 1 (Seg) a 7 (Dom) ou 0-6 dependendo da sua logica
  workingDays?: number[]
  minDurationMinutes: number
  maxDurationHours: number
  maxAdvanceBookingDays: number
  isActive: boolean
}

export class Room extends Entity<RoomProps> {
  get code(): string { return this.props.code }
  set code(value: string) { this.props.code = value }

  get name(): string { return this.props.name }
  set name(value: string) { this.props.name = value }

  get floor(): string | undefined { return this.props.floor }
  set floor(value: string) { this.props.floor = value }

  get capacity(): number { return this.props.capacity }
  set capacity(value: number) { this.props.capacity = value }

  get location(): string | undefined { return this.props.location }
  set location(value: string) { this.props.location = value }

  get description(): string | undefined { return this.props.description }
  set description(value: string) { this.props.description = value }

  get workingHoursStart(): string | undefined { return this.props.workingHoursStart }
  
  get workingHoursEnd(): string | undefined { return this.props.workingHoursEnd }

  get workingDays(): number[] | undefined { return this.props.workingDays }

  get minDurationMinutes(): number { 
    return this.props.minDurationMinutes ?? 15 
  }

  get maxDurationHours(): number { 
    return this.props.maxDurationHours ?? 8 
  }

  get maxAdvanceBookingDays(): number {
     return this.props.maxAdvanceBookingDays ?? 365 
  }

  get isActive(): boolean { 
    return this.props.isActive ?? true 
  }
  
  public deactivate() {
    this.props.isActive = false
  }

  public activate() {
    this.props.isActive = true
  }

  static create(props: RoomProps & Partial<EntityMetadata>): Room {
    // Aqui você pode adicionar validações de domínio, ex: Start < End
    const room = new Room({
      ...props,
      minDurationMinutes: props.minDurationMinutes ?? 15,
      maxDurationHours: props.maxDurationHours ?? 8,
      maxAdvanceBookingDays: props.maxAdvanceBookingDays ?? 365,
      isActive: props.isActive ?? true,
    })
    return room
  }
}