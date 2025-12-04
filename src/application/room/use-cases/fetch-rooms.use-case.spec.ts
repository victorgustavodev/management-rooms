
// src/application/room/use-cases/fetch-rooms.use-case.spec.ts
import { FetchRoomsUseCase } from './fetch-rooms.use-case';
import { InMemoryRoomRepository } from 'src/test/repositories/in-memory-room.repository';
import { Room } from 'src/domain/entities/room.entity';

describe('FetchRoomsUseCase', () => {
  let useCase: FetchRoomsUseCase;
  let repo: InMemoryRoomRepository;

  beforeEach(() => {
    repo = new InMemoryRoomRepository();
    useCase = new FetchRoomsUseCase(repo as any);
  });

  it('deve retornar salas com paginação', async () => {
    for (let i = 0; i < 3; i++) {
      await repo.create(
        Room.create({
          name: `Sala ${i}`,
          floor: `${i}`,
          capacity: 10 + i,
          location: `Prédio ${i}`,
          description: null,
          startOperationHours: '08:00',
          endOperationHours: '18:00',
          weekdaysOpeningHours: [1, 2, 3, 4, 5],
          active: true,
        }),
      );
    }

    const { rooms } = await useCase.execute({ limit: 2, offset: 0 });

    expect(rooms).toHaveLength(2);
    expect(rooms[0].name).toBe('Sala 0');
  });
});
