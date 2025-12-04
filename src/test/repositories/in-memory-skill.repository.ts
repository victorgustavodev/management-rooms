import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { SkillRepository } from 'src/domain/repositories/skill.repository'
import { Skill } from 'src/domain/entities/skill.entity'

export class InMemorySkillRepository
  extends InMemoryEntityRepository<Skill>
  implements SkillRepository
{
  async delete(id: string): Promise<void> {
  const index = this.items.findIndex((item) => item.id.toString() === id)
  if (index !== -1) {
    this.items.splice(index, 1)
  }
}

}
