import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateOrderCommand } from '../../commands/implementations/create-order.command';
import { DeleteOrderCommand } from '../../commands/implementations/delete-order.command';
import { UpdateOrderStatusCommand } from '../../commands/implementations/update-order-status.command';
import { CreateOrderDTO } from '../../dtos/create-order.dto';
import { Order, OrderStatus } from '../../entities/order.entity';
import { GetOrderByIdQuery } from '../../queries/implementations/get-order-by-id.query';
import { GetOrdersQuery } from '../../queries/implementations/get-orders.query';

@Injectable()
export class OrdersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createOrder(createOrderDTO: CreateOrderDTO): Promise<Order> {
    const command = new CreateOrderCommand(createOrderDTO);
    return await this.commandBus.execute(command);
  }

  async getOrderById(id: string): Promise<Order> {
    const query = new GetOrderByIdQuery(id);
    return await this.queryBus.execute(query);
  }

  async getAllOrders(): Promise<Order[]> {
    const query = new GetOrdersQuery();
    return await this.queryBus.execute(query);
  }

  async updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
    const command = new UpdateOrderStatusCommand(id, status);
    return await this.commandBus.execute(command);
  }

  async deleteOrder(id: string): Promise<void> {
    const command = new DeleteOrderCommand(id);
    return await this.commandBus.execute(command);
  }
}
