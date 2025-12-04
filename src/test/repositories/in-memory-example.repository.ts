import { InMemoryEntityRepository } from './in-memory-entity.repository'
import { ExampleRepository } from 'src/domain/repositories/example.repository'

import { Example } from 'src/domain/entities/example.entity'

export class InMemoryExampleRepository
  extends InMemoryEntityRepository<Example>
  implements ExampleRepository
{
}
