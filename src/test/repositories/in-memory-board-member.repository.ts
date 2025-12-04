import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { BoardMemberRepository } from 'src/domain/repositories/board-member.repository';
import { BoardMember } from 'src/domain/entities/board-member.entity';

export class InMemoryBoardMemberRepository
  extends InMemoryEntityRepository<BoardMember>
  implements BoardMemberRepository
{
  // Nenhum método adicional necessário
}
