import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { FetchMissionsQuery, MissionRepository } from 'src/domain/repositories/mission.repository'
import { Mission, BoardColumn } from 'src/domain/entities/mission.entity' // Importa o Enum

export class InMemoryMissionRepository
  extends InMemoryEntityRepository<Mission>
  implements MissionRepository
{
  async findMany(query: FetchMissionsQuery): Promise<Mission[]> {
    let filtered = this.items

    // Filtro opcional por boardId
    if (query.boardId) {
      filtered = filtered.filter(
        (mission) => mission.boardId === query.boardId
      )
    }

    // Filtro opcional por sprintId
    if (query.sprintId) {
      filtered = filtered.filter(
        (mission) => mission.sprintId === query.sprintId
      )
    }

    const { limit = filtered.length, offset = 0 } = query

    return filtered.slice(offset, offset + limit)
  }
}