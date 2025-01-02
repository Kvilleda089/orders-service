import { Test } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetAllOrdersQuery } from '../orders/queries/handlers/get-all-orders.handler';
import { Order, OrderStatus } from '../orders/entities/order.entity';

describe('GetAllOrdersQuery', () => {
  let queryHandler: GetAllOrdersQuery;
  let repository: Repository<Order>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetAllOrdersQuery,
        {
          provide: getRepositoryToken(Order),
          useClass: Repository,
        },
      ],
    }).compile();

    queryHandler = module.get<GetAllOrdersQuery>(GetAllOrdersQuery);
    repository = module.get<Repository<Order>>(getRepositoryToken(Order));
  });

  it('debería devolver todas las órdenes', async () => {
    const mockOrders: Order[] = [
      {
        id: '1',
        customerName: 'John Doe',
        totalAmount: 100,
        status: OrderStatus.PENDING,
        orderDate: new Date('2024-12-30'),
      },
      {
        id: '2',
        customerName: 'Jane Doe',
        totalAmount: 150,
        status: OrderStatus.COMPLETED,
        orderDate: new Date('2024-12-29'),
      },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(mockOrders);

    const result = await queryHandler.execute();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockOrders);
  });

  it('debería devolver un arreglo vacío si no hay órdenes', async () => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    const result = await queryHandler.execute();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
