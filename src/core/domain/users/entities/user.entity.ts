export class User {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly department: string | null,
    public readonly user_type: 'default' | 'admin',
    public readonly registered_at: Date,
    public readonly password: string,
    public readonly active: boolean = true,
    public readonly last_login: Date | null = null,
    public readonly phones: string[] = [],
    public readonly notify_email: boolean = true,
    public readonly notify_push: boolean = false,
  ) {}
}
