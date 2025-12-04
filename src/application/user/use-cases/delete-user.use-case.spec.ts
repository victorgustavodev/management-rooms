import { NotFoundException } from '@nestjs/common';
import { DeleteUserUseCase } from './delete-user.use-case';
import { User } from 'src/domain/entities/user.entity';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user.repository';

describe('DeleteUserUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: DeleteUserUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new DeleteUserUseCase(repo as any);
  });

  it('should delete a user successfully', async () => {
    const user = User.create({
      name: 'Test',
      email: 'test@mail.com',
      registration: '123',
      password: 'pass',
      departament: 'TI',
    });

    await repo.save(user);

    const deleteSpy = jest.spyOn(repo, 'delete');

    const result = await useCase.execute({ id: user.id.toString() });

    expect(result.success).toBe(true);
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('should throw NotFoundException if user does not exist', async () => {
    await expect(
      useCase.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
