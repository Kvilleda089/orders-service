import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetOrderByIdHandler } from '../src/orders/queries/handlers/get-order-by-id.handler';
import { Order, OrderStatus } from '../src/orders/entities/order.entity';
import { GetOrderByIdQuery } from '../src/orders/queries/implementations/get-order-by-id.query';
import { NotFoundException } from '@nestjs/common';

describe('GetOrderByIdHandler', () => {
  let handler: GetOrderByIdHandler;
  let repository: Repository<Order>;

  const mockOrder: Order = {
    id: '1',
    customerName: 'John Doe',
    totalAmount: 100,
    status: OrderStatus.PENDING,
    orderDate: new Date('2024-12-30'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetOrderByIdHandler,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            findOne: jest.fn().mockResolvedValue(mockOrder),
          },
        },
      ],
    }).compile();

    handler = module.get<GetOrderByIdHandler>(GetOrderByIdHandler);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
  });

  it('debería devolver un pedido si existe', async () => {
    const query: GetOrderByIdQuery = { id: '1' };
    const result = await handler.execute(query);
    expect(result).toEqual(mockOrder);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
  });

  it('Debería lanzar NotFoundException cuando el pedido no existe', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(null);

    const query: GetOrderByIdQuery = { id: '999' };
    await expect(handler.execute(query)).rejects.toThrowError(
      new NotFoundException('Order with ID 999 not found'),
    );
  });
});
