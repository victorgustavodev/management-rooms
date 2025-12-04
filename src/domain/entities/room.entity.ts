// domain/entities/room.entity.ts
import { Entity, EntityMetadata } from '../../core/entities/entity';

export interface RoomProps {
  name: string;
  floor: string;
  capacity: number;
  location: string;
  description?: string;
  startOperationHours: string; // 'HH:mm'
  endOperationHours: string; // 'HH:mm'
  weekdaysOpeningHours: number[];
  active: boolean;
}

export class Room extends Entity<RoomProps> {
  weekdaysOpeningHours: number[];
  get name(): string {
    return this.props.name;
  }
  get floor(): string {
    return this.props.floor;
  }
  get capacity(): number {
    return this.props.capacity;
  }
  get location(): string {
    return this.props.location;
  }
  get description(): string | null {
    if(!this.props.description){
      throw new Error("No description")
    }
    return this.props.description;
  }
  get startOperationHours(): string {
    return this.props.startOperationHours;
  }
  get endOperationHours(): string {
    return this.props.endOperationHours;
  }
  get active(): boolean {
    return this.props.active;
  }

  static create(props: RoomProps & Partial<EntityMetadata>): Room {
    return new Room({ ...props, active: props.active ?? true });
  }
}
