import { User } from 'src/domain/entities/user.entity'

export class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      registration: user.registration,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }
  }
}
