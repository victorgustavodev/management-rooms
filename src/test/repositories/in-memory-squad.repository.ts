import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { SquadRepository } from 'src/domain/repositories/squad.repository'
import { Squad } from 'src/domain/entities/squad.entity'

export class InMemorySquadRepository
  extends InMemoryEntityRepository<Squad>
  implements SquadRepository
{
}