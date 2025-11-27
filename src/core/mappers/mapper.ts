export abstract class Mapper<DomainEntity, PersistenceEntity> {
  abstract toDomain(persistenceEntity: PersistenceEntity): DomainEntity
  abstract toPersistence(domainEntity: DomainEntity): PersistenceEntity
}
