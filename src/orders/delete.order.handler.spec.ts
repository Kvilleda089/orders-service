import { Repository } from 'typeorm';
import { DeleteOrderHandler } from '../orders/commands/handlers/delete-order.handler';
import { Test, TestingModule } from '@nestjs/testing';
import { Order } from '../orders/entities/order.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

describe('DeleteOrderHandler', () => {
  let handler: DeleteOrderHandler;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteOrderHandler,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    handler = module.get<DeleteOrderHandler>(DeleteOrderHandler);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('debería lanzar NotFoundException si no se encuentra la orden', async () => {
    const command = { id: '1' };

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(handler.execute(command)).rejects.toThrowError(
      new NotFoundException('Order whit ID 1 not found'),
    );
  });

  it('debería eliminar la orden si existe', async () => {
    const command = { id: '1' };
    const mockOrder = new Order();
    mockOrder.id = '1';
    mockOrder.customerName = 'John Doe';
    mockOrder.totalAmount = 100;

    jest.spyOn(repository, 'findOne').mockResolvedValue(mockOrder);

    jest.spyOn(repository, 'remove').mockResolvedValue(undefined);

    await handler.execute(command);

    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(repository.remove).toHaveBeenCalledWith(mockOrder);
  });
});
