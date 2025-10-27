export class Participant {
  constructor(
    public readonly id: string,
    public readonly booking_id: string,
    public readonly user_id: string | null,
    public readonly email: string,
    public readonly confirmed: boolean = false,
  ) {}
}
