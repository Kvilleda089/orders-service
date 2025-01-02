import { Test, TestingModule } from '@nestjs/testing';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { OrdersService } from './services/orders/orders.service';
import { Order, OrderStatus } from './entities/order.entity';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { CreateOrderCommand } from './commands/implementations/create-order.command';
import { GetOrderByIdQuery } from './queries/implementations/get-order-by-id.query';
import { GetOrdersQuery } from './queries/implementations/get-orders.query';
import { UpdateOrderStatusCommand } from './commands/implementations/update-order-status.command';
import { DeleteOrderCommand } from './commands/implementations/delete-order.command';

describe('OrdersService', () => {
  let service: OrdersService;
  let commandBus: CommandBus;
  let queryBus: QueryBus;

  const mockOrder = new Order();
  mockOrder.id = '1';
  mockOrder.customerName = 'Test Customer';
  mockOrder.totalAmount = 100;
  mockOrder.status = OrderStatus.PENDING;
  mockOrder.orderDate = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: CommandBus,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: QueryBus,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createOrder', () => {
    it('should call commandBus.execute with CreateOrderCommand', async () => {
      const createOrderDTO: CreateOrderDTO = {
        customerName: 'Test Customer',
        totalAmount: 100,
      };

      (commandBus.execute as jest.Mock).mockResolvedValue(mockOrder);

      const result = await service.createOrder(createOrderDTO);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateOrderCommand(createOrderDTO),
      );
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getOrderById', () => {
    it('should return an order', async () => {
      const id = '1';
      (queryBus.execute as jest.Mock).mockResolvedValue(mockOrder);

      const result = await service.getOrderById(id);

      expect(queryBus.execute).toHaveBeenCalledWith(new GetOrderByIdQuery(id));
      expect(result).toEqual(mockOrder);
    });
  });

  describe('getAllOrders', () => {
    it('should return an array of orders', async () => {
      const orders = [mockOrder];
      (queryBus.execute as jest.Mock).mockResolvedValue(orders);

      const result = await service.getAllOrders();

      expect(queryBus.execute).toHaveBeenCalledWith(new GetOrdersQuery());
      expect(result).toEqual(orders);
    });
  });

  describe('updateOrderStatus', () => {
    it('should call commandBus.execute with UpdateOrderStatusCommand', async () => {
      const id = '1';
      const status = OrderStatus.COMPLETED;

      (commandBus.execute as jest.Mock).mockResolvedValue(mockOrder);

      const result = await service.updateOrderStatus(id, status);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new UpdateOrderStatusCommand(id, status),
      );
      expect(result).toEqual(mockOrder);
    });
  });

  describe('deleteOrder', () => {
    it('should call commandBus.execute with DeleteOrderCommand', async () => {
      const id = '1';

      (commandBus.execute as jest.Mock).mockResolvedValue(undefined);

      await service.deleteOrder(id);

      expect(commandBus.execute).toHaveBeenCalledWith(
        new DeleteOrderCommand(id),
      );
    });
  });
});
