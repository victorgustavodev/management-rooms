import { Repository } from 'src/core/repositories/repository'

export class InMemoryEntityRepository<T extends { id: { toString(): string } }>
  implements Repository<T>
{
  public items: T[] = []

  async create(entity: T): Promise<void> {
    this.items.push(entity)
  }

  async save(entity: T): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id.toString() === entity.id.toString()
    )

    this.items[itemIndex] = entity
  }

  async delete(entityId: string): Promise<void> {
    this.items = this.items.filter((item) => item.id.toString() !== entityId)
  }

  async findById(entityId: string): Promise<T | null> {
    const item = this.items.find((item) => item.id.toString() === entityId)

    if (!item) {
      return null
    }

    return item
  }

  async findMany(query: { limit?: number; offset?: number }): Promise<T[]> {
    const { limit = this.items.length, offset = 0 } = query

    const items = this.items.slice(offset, offset + limit)

    return items
  }
}
