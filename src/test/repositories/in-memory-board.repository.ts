import { InMemoryEntityRepository } from './in-memory-entity.repository'
import {
  BoardRepository,
  FetchBoardsQuery
} from 'src/domain/repositories/board.repository'
import { Board } from 'src/domain/entities/board.entity'

export class InMemoryBoardRepository
  extends InMemoryEntityRepository<Board>
  implements BoardRepository
{
  async findMany(query: FetchBoardsQuery): Promise<Board[]> {
    let filtered = this.items

    // Filtra por createdById
    if (query.createdById) {
      filtered = filtered.filter(
        (board) => board.createdById === query.createdById
      )
    }

    // Filtra por memberId
    if (query.memberId) {
      filtered = filtered.filter((board) =>
        // Verifica se existe algum BoardMember no array que contenha o memberId
        board.boardMembers.some(
          (boardMember) => boardMember.memberId === query.memberId
        )
      )
    }

    // Aplica paginação (limit e offset)
    const { limit = filtered.length, offset = 0 } = query

    return filtered.slice(offset, offset + limit)
  }
}
