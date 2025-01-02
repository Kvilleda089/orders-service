import { Test, TestingModule } from '@nestjs/testing';
import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateOrderHandler } from '../orders/commands/handlers/create-order.handler';
import { CreateOrderCommand } from '../orders/commands/implementations/create-order.command';
import { plainToClass } from 'class-transformer';
import { CqrsModule } from '@nestjs/cqrs';

describe('CreateOrderHandler', () => {
  let handler: CreateOrderHandler;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [
        CreateOrderHandler,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    handler = module.get<CreateOrderHandler>(CreateOrderHandler);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('debería crear y guardar un pedido', async () => {
    const command = new CreateOrderCommand({
      customerName: 'John Doe',
      totalAmount: 100,
    });

    const mockOrder = plainToClass(Order, {
      id: 1,
      customerName: 'John Doe',
      totalAmount: 100,
    });

    jest.spyOn(repository, 'create').mockReturnValue(mockOrder);
    jest.spyOn(repository, 'save').mockResolvedValue(mockOrder);

    const result = await handler.execute(command);

    expect(repository.create).toHaveBeenCalledWith({
      customerName: 'John Doe',
      totalAmount: 100,
    });
    expect(repository.save).toHaveBeenCalledWith(mockOrder);
    expect(result).toEqual(mockOrder);
  });
});
