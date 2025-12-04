import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { FileRepository } from 'src/domain/repositories/file.repository'
import { File } from 'src/domain/entities/file.entity'

export class InMemoryFileRepository
  extends InMemoryEntityRepository<File>
  implements FileRepository
{
  async findByEntityId(entityId: string): Promise<File[]> {
    const results = this.items.filter((file) => {
      return file.entityId === entityId
    })

    return results
  }
}