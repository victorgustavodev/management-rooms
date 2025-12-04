// src/domain/repositories/user.repository.ts
import { Repository } from 'src/core/repositories/repository';
import { User } from 'src/domain/entities/user.entity';

export interface UserRepository extends Repository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByRegistration(registration: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
}
