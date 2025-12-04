import { Column, Entity } from 'typeorm';
import { TypeormEntity } from './typeorm-entity.entity';

export enum BookingStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
  Rejected = 'rejected',
}

export interface BookingProps {
  roomId: string;
  userId: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  status: BookingStatus;
  recurrenceId?: string | null;
}

@Entity('bookings')
export class TypeormBookingEntity extends TypeormEntity implements BookingProps {
  @Column()
  roomId: string;

  @Column()
  userId: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamptz' })
  start: Date;

  @Column({ type: 'timestamptz' })
  end: Date;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.Pending })
  status: BookingStatus;
}
