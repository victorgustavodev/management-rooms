import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { TribeMemberRepository } from 'src/domain/repositories/tribe-member.repository';
import { TribeMember } from 'src/domain/entities/tribe-member.entity';

export class InMemoryTribeMemberRepository
  extends InMemoryEntityRepository<TribeMember>
  implements TribeMemberRepository
{
  async findByPlayerAndTribe(
    playerId: string,
    tribeId: string
  ): Promise<TribeMember | null> {
    // Procura na lista de itens (TribeMember) onde:
    // 1. O ID do jogador corresponde ao playerId fornecido
    // 2. O ID da tribo corresponde ao tribeId fornecido
    const tribeMember = this.items.find((member) => {
      return (
        member.playerId.toString() === playerId &&
        member.tribeId.toString() === tribeId
      )
    })

    // Retorna o membro encontrado ou null se nenhum for achado
    return tribeMember ?? null
  }
}
