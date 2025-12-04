import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';

interface PaginationParams {
  limit: number;
  offset: number;
}

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async save(user: User): Promise<void> {
    const index = this.items.findIndex((u) => u.id.equals(user.id));

    if (index === -1) {
      this.items.push(user);
    } else {
      this.items[index] = user;
    }
  }

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((u) => u.id.toString() === id);
    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((u) => u.email === email);
    return user ?? null;
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((user) => user.id.toString() !== id);
  }

  async findMany({ limit, offset }: PaginationParams): Promise<User[]> {
    return this.items.slice(offset, offset + limit);
  }
}
