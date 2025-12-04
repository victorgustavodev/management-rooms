import { NotFoundException } from '@nestjs/common';
import { GetUserUseCase } from './get-user.use-case';
import { User } from 'src/domain/entities/user.entity';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user.repository';

describe('GetUserUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: GetUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new GetUserUseCase(repo as any);
  });

  it('should return a user', async () => {
    const user = User.create({
      name: 'Test',
      email: 'test@mail.com',
      registration: '123',
      password: 'pass',
      departament: 'TI',
    });

    await repo.save(user);

    const result = await useCase.execute({ id: user.id.toString() });

    expect(result.user.email).toBe('test@mail.com');
  });

  it('should throw NotFoundException if user not found', async () => {
    await expect(
      useCase.execute({ id: 'invalid-id' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
