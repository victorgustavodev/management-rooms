// src/domain/entities/room.entity.ts
import { Entity, EntityMetadata } from 'src/core/entities/entity';

export interface RoomProps {
  name: string;
  floor: string;
  capacity: number;
  location: string;
  description?: string | null;
  startOperationHours: string; // 'HH:mm'
  endOperationHours: string;   // 'HH:mm'
  weekdaysOpeningHours: number[];
  active: boolean;
}

export class Room extends Entity<RoomProps> {
  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get floor(): string {
    return this.props.floor;
  }

  set floor(value: string) {
    this.props.floor = value;
  }

  get capacity(): number {
    return this.props.capacity;
  }

  set capacity(value: number) {
    this.props.capacity = value;
  }

  get location(): string {
    return this.props.location;
  }

  set location(value: string) {
    this.props.location = value;
  }

  get description(): string | null | undefined {
    return this.props.description;
  }

  set description(value: string | null | undefined) {
    this.props.description = value ?? null;
  }

  get startOperationHours(): string {
    return this.props.startOperationHours;
  }

  set startOperationHours(value: string) {
    this.props.startOperationHours = value;
  }

  get endOperationHours(): string {
    return this.props.endOperationHours;
  }

  set endOperationHours(value: string) {
    this.props.endOperationHours = value;
  }

  get weekdaysOpeningHours(): number[] {
    return this.props.weekdaysOpeningHours;
  }

  set weekdaysOpeningHours(value: number[]) {
    this.props.weekdaysOpeningHours = value;
  }

  get active(): boolean {
    return this.props.active;
  }

  set active(value: boolean) {
    this.props.active = value;
  }

  static create(props: RoomProps & Partial<EntityMetadata>): Room {
    const room = new Room(props);
    return room;
  }
}
