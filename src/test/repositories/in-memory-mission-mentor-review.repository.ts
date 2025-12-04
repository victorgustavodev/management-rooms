import { InMemoryEntityRepository } from './in-memory-entity.repository';
import { MissionMentorReviewRepository } from 'src/domain/repositories/mission-mentor-review.repository';
import { MissionMentorReview } from 'src/domain/entities/mission-mentor-review.entity';

export class InMemoryMissionMentorReviewRepository
  extends InMemoryEntityRepository<MissionMentorReview>
  implements MissionMentorReviewRepository
{
  async findByMissionIdAndReviewerId(
    missionId: string,
    reviewerId: string
  ): Promise<MissionMentorReview | null> {
    // Usa a estrutura de dados interna (items) para procurar o registro
    const review = this.items.find(
      (item) => item.missionId === missionId && item.reviewedById === reviewerId
    )

    // Retorna a entidade ou null se não encontrada
    return review || null
  }
}
