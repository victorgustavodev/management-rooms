import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { TribeRepository } from 'src/domain/repositories/tribe.repository'
import { Tribe } from 'src/domain/entities/tribe.entity'
import { InMemoryKingdomTribeRepository } from './in-memory-kingdom-tribe.repository'

export class InMemoryTribeRepository
  extends InMemoryEntityRepository<Tribe>
  implements TribeRepository
{
  constructor(
    private readonly kingdomTribeRepository?: InMemoryKingdomTribeRepository
  ) {
    super()
  }
}
