import type { UniqueEntityID } from 'src/core/entities/unique-entity-id'
import { Entity, EntityMetadata } from '../../core/entities/entity'

export enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
  Rejected = 'rejected'
}

export interface BookingProps {
  roomId: string
  userId: string
  title: string
  description?: string | null
  start: Date
  end: Date
  status: BookingStatus
  recurrenceId?: string | null
}

export class Booking extends Entity<BookingProps> {
  get roomId(): string { return this.props.roomId }
  get userId(): string { return this.props.userId }
  
  get title(): string { return this.props.title }
  set title(value: string) { this.props.title = value }

  get description(): string | null | undefined { return this.props.description }
  set description(value: string) { this.props.description = value }

  get start(): Date { return this.props.start }
  get end(): Date { return this.props.end }

  get status(): BookingStatus { return this.props.status }
  
  get recurrenceId(): string | null | undefined { return this.props.recurrenceId }


  // Actions
  public confirm() {
    if (this.props.status === BookingStatus.Canceled) {
        throw new Error("Cannot confirm a canceled booking")
    }
    this.props.status = BookingStatus.Confirmed
  }

  public cancel() {
    this.props.status = BookingStatus.Canceled
  }

  public reject() {
    this.props.status = BookingStatus.Rejected
  }

  // Domain Logic
  public durationInMinutes(): number {
    return (this.props.end.getTime() - this.props.start.getTime()) / 60000
  }

  static create(props: BookingProps & Partial<EntityMetadata>, p0: UniqueEntityID): Booking {
    if (props.end <= props.start) {
        throw new Error("End date must be after start date")
    }

    const booking = new Booking({
      ...props,
      status: props.status ?? BookingStatus.Confirmed,
    })
    return booking
  }
}