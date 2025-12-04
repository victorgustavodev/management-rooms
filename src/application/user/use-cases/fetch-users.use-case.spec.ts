import { FetchUsersUseCase } from './fetch-users.use-case';
import { User } from 'src/domain/entities/user.entity';
import { InMemoryUserRepository } from 'src/test/repositories/in-memory-user.repository';

describe('FetchUsersUseCase', () => {
  let repo: InMemoryUserRepository;
  let useCase: FetchUsersUseCase;

  beforeEach(() => {
    repo = new InMemoryUserRepository();
    useCase = new FetchUsersUseCase(repo as any);
  });

  it('should return users', async () => {
    const user1 = User.create({
      name: 'A',
      email: 'a@mail.com',
      registration: '1',
      password: 'p',
      departament: 'TI',
    });

    const user2 = User.create({
      name: 'B',
      email: 'b@mail.com',
      registration: '2',
      password: 'p',
      departament: 'TI',
    });

    await repo.save(user1);
    await repo.save(user2);

    const result = await useCase.execute({ limit: 10, offset: 0 });

    expect(result.users.length).toBe(2);
  });

  it('should call repository with default pagination if none provided', async () => {
    const spy = jest.spyOn(repo, 'findMany').mockResolvedValue([]);

    await useCase.execute({});

    expect(spy).toHaveBeenCalledWith({ limit: 1, offset: 20 });
  });
});
