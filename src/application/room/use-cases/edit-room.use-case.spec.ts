// src/application/room/use-cases/edit-room.use-case.spec.ts
import { NotFoundException } from '@nestjs/common';
import { EditRoomUseCase } from './edit-room.use-case';
import { InMemoryRoomRepository } from 'src/test/repositories/in-memory-room.repository';
import { Room } from 'src/domain/entities/room.entity';

describe('EditRoomUseCase', () => {
  let useCase: EditRoomUseCase;
  let repo: InMemoryRoomRepository;

  beforeEach(() => {
    repo = new InMemoryRoomRepository();
    useCase = new EditRoomUseCase(repo as any);
  });

  it('deve editar os dados da sala', async () => {
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

    const { room: updated } = await useCase.execute({
      id: room.id.toString(),
      name: 'Sala 101 - Atualizada',
      capacity: 20,
      active: false,
    });

    expect(updated.name).toBe('Sala 101 - Atualizada');
    expect(updated.capacity).toBe(20);
    expect(updated.active).toBe(false);
  });

  it('deve lançar NotFoundException se sala não existir', async () => {
    await expect(
      useCase.execute({ id: 'non-existing-id', name: 'X' }),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
