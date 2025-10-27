export class Booking {
  constructor(
    public readonly id: string,
    public readonly room_id: string,
    public readonly user_id: string,
    public readonly title: string,
    public readonly description: string | null,
    public readonly start: Date,
    public readonly end: Date,
    public readonly status: 'pending' | 'confirmed' | 'cancelled' | 'rejected' = 'pending',
    public readonly recurrence_id?: string | null,
    public readonly created_at: Date = new Date(),
    public readonly updated_at: Date = new Date(),
    public readonly equipment_requirements: { name: string; quantity: number }[] = [],
    public readonly catering_required: boolean = false,
    public readonly version: number = 1,
  ) {}

  public isActive(): boolean {
    return this.status === 'pending' || this.status === 'confirmed';
  }

  public durationInMinutes(): number {
    return Math.floor((this.end.getTime() - this.start.getTime()) / 60000);
  }
}
