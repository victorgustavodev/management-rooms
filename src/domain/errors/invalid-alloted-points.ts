import { UseCaseError } from 'src/core/errors/use-case-error'

export class InvalidAllotedPointsError extends Error implements UseCaseError {
  public statusCode: number

  constructor(message: string = 'Invalid alloted points error') {
    super(message)
    this.name = 'InvalidAllotedPointsError'
    this.statusCode = 400

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, InvalidAllotedPointsError)
    }
  }
}
