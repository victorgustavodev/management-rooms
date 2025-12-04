// src/application/room/use-cases/get-room.use-case.spec.ts
import { NotFoundException } from '@nestjs/common';
import { GetRoomUseCase } from './get-room.use-case';
import { InMemoryRoomRepository } from 'src/test/repositories/in-memory-room.repository';
import { Room } from 'src/domain/entities/room.entity';

describe('GetRoomUseCase', () => {
  let useCase: GetRoomUseCase;
  let repo: InMemoryRoomRepository;

  beforeEach(() => {
    repo = new InMemoryRoomRepository();
    useCase = new GetRoomUseCase(repo as any);
  });

  it('deve retornar uma sala por id', async () => {
    const room = Room.create({
      name: 'Sala 101',
      floor: '1',
      capacity: 10,
      location: 'Prédio A',
      description: 'Sala de reunião',
      startOperationHours: '08:00',
      endOperationHours: '18:00',
      weekdaysOpeningHours: [1, 2, 3, 4, 5],
      active: true,
    });

    await repo.create(room);

    const { room: found } = await useCase.execute({ id: room.id.toString() });

    expect(found.id.toString()).toBe(room.id.toString());
  });

  it('deve lançar NotFoundException se sala não existir', async () => {
    await expect(
      useCase.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
