export class Room {
  constructor(
    public readonly id: string,
    public readonly code: string,
    public readonly name: string,
    public readonly floor: string | null,
    public readonly capacity: number,
    public readonly location: string | null,
    public readonly description: string | null,
    public readonly open_time: string, // e.g. "08:00"
    public readonly close_time: string, // e.g. "18:00"
    public readonly open_days: number[], // [1,2,3,4,5]
    public readonly min_duration_minutes: number = 15,
    public readonly max_duration_hours: number = 8,
    public readonly max_days_in_advance: number = 365,
    public readonly active: boolean = true,
  ) {}
}
