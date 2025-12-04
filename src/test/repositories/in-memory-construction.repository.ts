import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { ConstructionRepository } from 'src/domain/repositories/construction.repository'
import { Construction } from 'src/domain/entities/construction.entity'

export class InMemoryConstructionRepository
  extends InMemoryEntityRepository<Construction>
  implements ConstructionRepository {}
