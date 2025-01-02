import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateOrderStatusHandler } from '../orders/commands/handlers/update-order-status.handler';
import { Order, OrderStatus } from '../orders/entities/order.entity';

describe('UpdateOrderStatusHandler', () => {
  let handler: UpdateOrderStatusHandler;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateOrderStatusHandler,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    handler = module.get<UpdateOrderStatusHandler>(UpdateOrderStatusHandler);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('debería lanzar NotFoundException si no se encuentra la orden', async () => {
    const command = { id: '1', status: OrderStatus.PENDING };

    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(handler.execute(command)).rejects.toThrowError(
      new NotFoundException('Order with ID 1 not found'),
    );
  });

  it('debería lanzar BadRequestException si el estado de la orden es inválido', async () => {
    const command = { id: '1', status: 'INVALID_STATUS' as OrderStatus };

    const mockOrder = plainToClass(Order, {
      id: '1',
      customerName: 'John Doe',
      totalAmount: 100,
    });
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockOrder);

    await expect(handler.execute(command)).rejects.toThrowError(
      new BadRequestException('Invalid order satatus: INVALID_STATUS'),
    );
  });

  it('debería actualizar el estado de la orden si todo es correcto', async () => {
    const command = { id: '1', status: OrderStatus.COMPLETED };

    const mockOrder = plainToClass(Order, {
      id: '1',
      customerName: 'John Doe',
      totalAmount: 100,
      status: OrderStatus.PENDING,
    });
    jest.spyOn(repository, 'findOne').mockResolvedValue(mockOrder);
    jest
      .spyOn(repository, 'save')
      .mockResolvedValue({ ...mockOrder, status: OrderStatus.COMPLETED });

    const result = await handler.execute(command);

    expect(repository.save).toHaveBeenCalledWith({
      ...mockOrder,
      status: OrderStatus.COMPLETED,
    });
    expect(result.status).toEqual(OrderStatus.COMPLETED);
  });
});
