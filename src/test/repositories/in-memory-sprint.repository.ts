import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { SprintRepository } from 'src/domain/repositories/sprint.repository';
import { Sprint } from 'src/domain/entities/sprint.entity';

export class InMemorySprintRepository
  extends InMemoryEntityRepository<Sprint>
  implements SprintRepository
{

}
