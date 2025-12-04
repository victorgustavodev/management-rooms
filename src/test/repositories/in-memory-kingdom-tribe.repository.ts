import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { KingdomTribeRepository } from 'src/domain/repositories/kingdom-tribe.repository';
import { KingdomTribe } from 'src/domain/entities/kingdom-tribe.entity';

export class InMemoryKingdomTribeRepository
  extends InMemoryEntityRepository<KingdomTribe>
  implements KingdomTribeRepository
{
  // Nenhum método adicional necessário
}