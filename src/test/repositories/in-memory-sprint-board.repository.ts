import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { SprintBoardRepository } from 'src/domain/repositories/sprint-board.repository';
import { SprintBoard } from 'src/domain/entities/sprint-board.entity';

export class InMemorySprintBoardRepository
  extends InMemoryEntityRepository<SprintBoard>
  implements SprintBoardRepository
{
  // Nenhum método adicional necessário
}
