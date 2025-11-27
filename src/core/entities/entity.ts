import { UniqueEntityID } from './unique-entity-id'

export interface EntityMetadata {
  id: UniqueEntityID
  createdAt: Date
  updatedAt: Date
  deletedAt?: Date | null | undefined
}

export abstract class Entity<Props> {
  private readonly _id: UniqueEntityID
  protected props: Props

  private readonly _createdAt: Date
  private _updatedAt: Date
  private _deletedAt?: Date | null | undefined

  protected constructor(props: Props & Partial<EntityMetadata>) {
    const { id, createdAt, updatedAt, deletedAt, ...rest } = props

    this._id = id ?? new UniqueEntityID()
    this._createdAt = createdAt ?? new Date()
    this._updatedAt = updatedAt ?? new Date()
    this._deletedAt = deletedAt ?? null

    this.props = rest as Props
  }

  get id() {
    return this._id
  }

  public get createdAt(): Date {
    return this._createdAt
  }

  public get updatedAt(): Date {
    return this._updatedAt
  }

  public get deletedAt(): Date | null | undefined {
    return this._deletedAt
  }

  protected touch(): void {
    this._updatedAt = new Date()
  }

  public equals(entity?: Entity<unknown>): boolean {
    if (
      entity === null ||
      entity === undefined ||
      !(entity instanceof Entity)
    ) {
      return false
    }

    if (entity === this) {
      return true
    }

    return this._id.equals(entity.id)
  }
}
