import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { PlayerSkillRepository } from 'src/domain/repositories/player-skill.repository';
import { PlayerSkill } from 'src/domain/entities/player-skill.entity';

export class InMemoryPlayerSkillRepository
  extends InMemoryEntityRepository<PlayerSkill>
  implements PlayerSkillRepository
{
  // Nenhum método adicional necessário
}
