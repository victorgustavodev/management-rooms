import { ConfigService } from '@nestjs/config'

import { Entity } from 'src/core/entities/entity'
import { TypeormEntity } from '../entities/typeorm-entity.entity'

import { Repository } from 'src/core/repositories/repository'
import { Repository as TypeormRepository } from 'typeorm'

import { Mapper } from '../../../../core/mappers/mapper'

/**
 * Classe base abstrata para repositórios que utilizam TypeORM.
 * Abstrai a lógica comum de CRUD e o uso de mappers.
 * @template DomainEntity - A entidade de domínio.
 * @template PersistenceEntity - A entidade de persistência do TypeORM.
 */
export abstract class TypeormEntityRepository<
  DomainEntity extends Entity<any>,
  PersistenceEntity extends TypeormEntity
> implements Repository<DomainEntity>
{
  private readonly paginationLimit: number

  protected constructor(
    protected readonly repository: TypeormRepository<PersistenceEntity>,
    protected readonly mapper: Mapper<DomainEntity, PersistenceEntity>,
    protected readonly configService: ConfigService
  ) {
    this.paginationLimit =
      this.configService.get<number>('PAGINATION_LIMIT') || 50
  }

  async create(entity: DomainEntity): Promise<void> {
    const persistenceEntity = this.mapper.toPersistence(entity)

    await this.repository.save(persistenceEntity)
  }

  async save(entity: DomainEntity): Promise<void> {
    const persistenceEntity = this.mapper.toPersistence(entity)

    await this.repository.save(persistenceEntity)
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

  async findById(id: string): Promise<DomainEntity | null> {
    const result = await this.repository.findOne({
      where: { id }
    } as any)

    if (!result) {
      return null
    }

    return this.mapper.toDomain(result)
  }

  async findMany(query: {
    limit?: number
    offset?: number
  }): Promise<DomainEntity[]> {
    const limit = query.limit ?? this.paginationLimit
    const offset = query.offset ?? 0

    const results = await this.repository.find({
      take: limit,
      skip: offset
    })

    return results.map((entity) => this.mapper.toDomain(entity))
  }
}
