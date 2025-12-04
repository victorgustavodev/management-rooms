import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TypeormEntity } from './typeorm-entity.entity';

@Entity('rooms')
export class TypeormRoomEntity extends TypeormEntity {
  @Column()
  name: string;

  @Column()
  floor: string;

  @Column()
  capacity: number;

  @Column()
  location: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  startOperationHours: string;

  @Column()
  endOperationHours: string;

  @Column('simple-array') // or 'int' array type depending on TypeORM version
  weekdaysOpeningHours: number[];

  @Column({ default: true })
  active: boolean;

  // User relationship (if this represents a user/room hybrid)
  @OneToOne(() => TypeormEntity, { nullable: true })
  @JoinColumn()
  user?: TypeormEntity;

}
