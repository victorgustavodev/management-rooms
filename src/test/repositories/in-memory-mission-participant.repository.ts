import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { MissionParticipantRepository } from 'src/domain/repositories/mission-participant.repository';
import { MissionParticipant } from 'src/domain/entities/mission-participant.entity';

export class InMemoryMissionParticipantRepository
  extends InMemoryEntityRepository<MissionParticipant>
  implements MissionParticipantRepository
{
  findManyByMissionId(
    missionId: string,
    query: { limit?: number; offset?: number }
  ): Promise<MissionParticipant[]> {
    const { limit = 10, offset = 0 } = query

    let participants = this.items.filter(
      (participant) => participant.missionId === missionId
    )

    // Aplica o offset (paginação)
    participants = participants.slice(offset)

    // Aplica o limit
    if (limit > 0) {
      participants = participants.slice(0, limit)
    }

    return Promise.resolve(participants)
  }

  async findByMissionAndPlayer(
    missionId: string,
    playerId: string
  ): Promise<MissionParticipant | null> {
    const participant = this.items.find(
      (participant) =>
        participant.missionId === missionId &&
        participant.participantId === playerId
    )
    return participant ? participant : null
  }
}
