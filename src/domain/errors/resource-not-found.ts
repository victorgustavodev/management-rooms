import { UseCaseError } from 'src/core/errors/use-case-error'

export class ResourceNotFound extends Error implements UseCaseError {
  public statusCode: number

  constructor(message: string = 'Resource not found') {
    super(message)
    this.name = 'ResourceNotFound'
    this.statusCode = 404

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResourceNotFound)
    }
  }
}
