import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { SquadMemberRepository } from 'src/domain/repositories/squad-member.repository';
import { SquadMember } from 'src/domain/entities/squad-member.entity';

export class InMemorySquadMemberRepository
  extends InMemoryEntityRepository<SquadMember>
  implements SquadMemberRepository
{
  async findByPlayerAndSquad(
    playerId: string,
    squadId: string
  ): Promise<SquadMember | null> {
    const member = this.items.find(
      (item) =>
        item.playerId.toString() === playerId &&
        item.squadId.toString() === squadId
    )

    if (!member) {
      return null
    }

    return member
  }
}
