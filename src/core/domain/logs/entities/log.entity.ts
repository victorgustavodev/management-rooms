export class Log {
  constructor(
    public readonly id: string,
    public readonly action: string,
    public readonly collection: string,
    public readonly document_id: string,
    public readonly user_id: string,
    public readonly before: Record<string, any> | null = null,
    public readonly after: Record<string, any> | null = null,
    public readonly timestamp: Date = new Date(),
    public readonly ip: string | null = null,
  ) {}
}
