// src/application/room/use-cases/delete-room.use-case.spec.ts
import { NotFoundException } from '@nestjs/common';
import { DeleteRoomUseCase } from './delete-room.use-case';
import { InMemoryRoomRepository } from 'src/test/repositories/in-memory-room.repository';
import { Room } from 'src/domain/entities/room.entity';

describe('DeleteRoomUseCase', () => {
  let useCase: DeleteRoomUseCase;
  let repo: InMemoryRoomRepository;

  beforeEach(() => {
    repo = new InMemoryRoomRepository();
    useCase = new DeleteRoomUseCase(repo as any);
  });

  it('deve deletar a sala', async () => {
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

    const { success } = await useCase.execute({ id: room.id.toString() });

    expect(success).toBe(true);
    expect(repo.items).toHaveLength(0);
  });

  it('deve lançar NotFoundException se sala não existir', async () => {
    await expect(
      useCase.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
