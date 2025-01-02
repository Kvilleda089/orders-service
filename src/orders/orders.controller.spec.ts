import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders/orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { OrderResponseDTO } from './dtos/order-response.dto';
import { OrderStatus } from './entities/order.entity';

const mockOrderService = {
  createOrder: jest.fn(),
  getOrderById: jest.fn(),
  getAllOrders: jest.fn(),
  updateOrderStatus: jest.fn(),
  deleteOrder: jest.fn(),
};

describe('OrdersController', () => {
  let ordersController: OrdersController;
  let ordersService: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: mockOrderService,
        },
      ],
    }).compile();

    ordersController = module.get<OrdersController>(OrdersController);
    ordersService = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(ordersController).toBeDefined();
  });

  describe('createOrder', () => {
    it('should create an order and return a response DTO', async () => {
      const createOrderDto: CreateOrderDTO = {
        customerName: 'Pedro Pazcal',
        totalAmount: 32103.3,
      };
      const result = {
        id: 'f0f71bab-dace-4af9-a40a-985f75209724',
        customerName: 'Pedro Pazcal',
        orderDate: '2025-01-02T01:38:57.476Z',
        totalAmount: 32103.3,
        status: 'PENDING',
      };

      mockOrderService.createOrder.mockResolvedValue(result);

      const response = await ordersController.createOrder(createOrderDto);
      expect(response).toBeInstanceOf(OrderResponseDTO);
      expect(response.id).toEqual(result.id);
      expect(response.customerName).toEqual(createOrderDto.customerName);
    });
  });

  describe('getOrderById', () => {
    it('should return an order by id', async () => {
      const result = {
        id: 'f0f71bab-dace-4af9-a40a-985f75209724',
        customerName: 'Pedro Pazcal',
        orderDate: '2025-01-02T01:38:57.476Z',
        totalAmount: 32103.3,
        status: 'PENDING',
      };

      mockOrderService.getOrderById.mockResolvedValue(result);

      const response = await ordersController.getOrderById(result.id);
      expect(response).toBeInstanceOf(OrderResponseDTO);
      expect(response.id).toEqual(result.id);
    });
  });

  describe('getAllOrders', () => {
    it('should return a list of orders', async () => {
      const result = [
        {
          id: 'f0f71bab-dace-4af9-a40a-985f75209724',
          customerName: 'Pedro Pazcal',
          orderDate: '2025-01-02T01:38:57.476Z',
          totalAmount: 32103.3,
          status: 'PENDING',
        },
      ];

      mockOrderService.getAllOrders.mockResolvedValue(result);

      const response = await ordersController.getAllOrders();
      expect(response).toEqual(result);
    });
  });

  describe('updateOrder', () => {
    it('should update the order status', async () => {
      const id = 'f0f71bab-dace-4af9-a40a-985f75209724';
      const status: OrderStatus = OrderStatus.COMPLETED;

      mockOrderService.updateOrderStatus.mockResolvedValue({
        id,
        customerName: 'Pedro Pazcal',
        orderDate: '2025-01-02T01:38:57.476Z',
        totalAmount: 32103.3,
        status,
      });

      const response = await ordersController.updateOrder(id, status);
      expect(response.status).toEqual(status);
      console.log(response);
    });
  });
  describe('deleteOrderCommand', () => {
    it('should delete an order', async () => {
      const id = 'f0f71bab-dace-4af9-a40a-985f75209724';
      mockOrderService.deleteOrder.mockResolvedValue({});

      await expect(
        ordersController.DeleteOrderCommand(id),
      ).resolves.not.toThrow();
    });
  });
});
