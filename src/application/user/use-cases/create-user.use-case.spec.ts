import { ConflictException } from '@nestjs/common';
import { User } from 'src/domain/entities/user.entity';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user.repository';
import { CreateUserUseCase } from './create-user.use-case';

describe('CreateUserUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: CreateUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new CreateUserUseCase(repo as any);
  });

  it('should create a user successfully', async () => {
    const saveSpy = jest.spyOn(repo, 'save');

    const request = {
      name: 'John Doe',
      email: 'john@example.com',
      registration: '123',
      password: '123',
      departament: 'TI',
    };

    const result = await useCase.execute(request);

    expect(result.user).toBeInstanceOf(User);
    expect(saveSpy).toHaveBeenCalled();
    expect(result.user.email).toBe(request.email);
  });

  it('should throw ConflictException if email already exists', async () => {
    const existing = User.create({
      name: 'Old',
      email: 'john@example.com',
      registration: '111',
      password: 'secret',
      departament: 'TI',
    });

    jest.spyOn(repo, 'findByEmail').mockResolvedValue(existing);

    await expect(
      useCase.execute({
        name: 'John Doe',
        email: 'john@example.com',
        registration: '123',
        password: '123',
        departament: 'TI',
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
