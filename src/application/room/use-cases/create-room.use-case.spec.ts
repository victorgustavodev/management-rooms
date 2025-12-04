// src/application/room/use-cases/create-room.use-case.spec.ts
import { ConflictException } from '@nestjs/common';
import { CreateRoomUseCase } from './create-room.use-case';
import { Room } from 'src/domain/entities/room.entity';
import { InMemoryRoomRepository } from 'src/test/repositories/in-memory-room.repository';

describe('CreateRoomUseCase', () => {
  let useCase: CreateRoomUseCase;
  let repo: InMemoryRoomRepository;

  beforeEach(() => {
    repo = new InMemoryRoomRepository();
    useCase = new CreateRoomUseCase(repo as any);
  });

  it('deve criar uma sala com sucesso', async () => {
    const { room } = await useCase.execute({
      code: 'R-101',
      name: 'Sala 101',
      floor: '1',
      capacity: 10,
      location: 'Prédio A',
      description: 'Sala de reunião',
      workingHoursStart: '08:00',
      workingHoursEnd: '18:00',
      workingDays: [1, 2, 3, 4, 5],
    });

    expect(room).toBeInstanceOf(Room);
    expect(repo.items).toHaveLength(1);
    expect(repo.items[0].name).toBe('Sala 101');
  });

  it('deve lançar erro se já existir sala com o mesmo nome', async () => {
    await useCase.execute({
      code: 'R-101',
      name: 'Sala 101',
      floor: '1',
      capacity: 10,
      location: 'Prédio A',
      workingHoursStart: '08:00',
      workingHoursEnd: '18:00',
      workingDays: [1, 2, 3, 4, 5],
    });

    await expect(
      useCase.execute({
        code: 'R-102',
        name: 'Sala 101',
        floor: '1',
        capacity: 8,
        location: 'Prédio B',
        workingHoursStart: '09:00',
        workingHoursEnd: '17:00',
        workingDays: [1, 2, 3, 4, 5],
      }),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
