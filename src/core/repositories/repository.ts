export interface Repository<T> {
  create(entity: T): Promise<void>
  save(entity: T): Promise<void>
  delete(entityId: string): Promise<void>
  findById(entityId: string): Promise<T | null>
  findMany(query: { limit?: number; offset?: number }): Promise<T[]>
}
