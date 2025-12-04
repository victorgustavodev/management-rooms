import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { PlayerRepository } from 'src/domain/repositories/player.repository'
import { Player } from 'src/domain/entities/player.entity'

export class InMemoryPlayerRepository
  extends InMemoryEntityRepository<Player>
  implements PlayerRepository
{
  async findByUserId(userId: string): Promise<Player | null> {
    const player = this.items.find((item) => item.userId === userId)

    return player || null
  }
}
