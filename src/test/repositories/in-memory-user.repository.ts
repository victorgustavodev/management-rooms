import { User } from 'src/domain/entities/user.entity';
import { UserRepository } from 'src/domain/repositories/user.repository';

interface PaginationParams {
  limit?: number;
  offset?: number;
}

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(user: User): Promise<void> {
    this.items.push(user);
  }

  async save(user: User): Promise<void> {
    const index = this.items.findIndex((u) => u.id.equals(user.id));

    if (index === -1) {
      this.items.push(user);
    } else {
      this.items[index] = user;
    }
  }

  async delete(id: string): Promise<void> {
    this.items = this.items.filter((user) => user.id.toString() !== id);
  }

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((u) => u.id.toString() === id);
    return user ?? null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((u) => u.email === email);
    return user ?? null;
  }

  async findByRegistration(registration: string): Promise<User | null> {
    const user = this.items.find((u) => u.registration === registration);
    return user ?? null;
  }

  async findByCpf(cpf: string): Promise<User | null> {
    const user = this.items.find((u) => u.cpf === cpf);
    return user ?? null;
  }

  async findMany({ limit, offset }: PaginationParams): Promise<User[]> {
    const start = offset ?? 0;
    const end = limit != null ? start + limit : undefined;
    return this.items.slice(start, end);
  }
}
