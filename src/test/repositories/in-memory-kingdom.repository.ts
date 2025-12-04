import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { KingdomRepository } from 'src/domain/repositories/kingdom.repository'
import { Kingdom } from 'src/domain/entities/kingdom.entity'

export class InMemoryKingdomRepository
  extends InMemoryEntityRepository<Kingdom>
  implements KingdomRepository
{
}